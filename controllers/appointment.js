const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const pool = require("../config");

const getAllSlots = async (req, res) =>
  // This query is getting us all the available slots for the particular salon on a given date and ordering it by chair number and start time of the slot
  pool.query(
    `SELECT slot_id,start_time,chair_number FROM slots WHERE slots.salon_id=${req.params.id} AND NOT EXISTS(SELECT slot_id FROM appointments WHERE appointments.slot_id=slots.slot_id AND appointments.date_of_appointment='${req.params.date}') ORDER BY chair_number, start_time;`,

    (err, result) => {
      err ? console.log(err) : null;
      res.status(200).json(result.rows);
    }
  );

const getAllSlotsByChairNo = async (req, res) =>
  // This query is getting us all the available slots for the particular salon on a given date at a particular chair number and ordering it by chair number and start time of the slot
  pool.query(
    `SELECT slot_id,start_time,chair_number FROM slots WHERE slots.salon_id=${req.params.id} AND slots.chair_number='${req.params.chair}' AND NOT EXISTS(SELECT slot_id FROM appointments WHERE appointments.slot_id=slots.slot_id AND appointments.date_of_appointment='${req.params.date}') ORDER BY chair_number, start_time;`,

    (err, result) => {
      err ? console.log(err) : null;
      res.status(200).json(result.rows);
    }
  );

const createNewAppointment = async (req, res) => {
  let newAppointment = await prisma.appointments.create({
    data: {
      user_id: req.body.user_id,
      salon_id: req.body.salon_id,
      chair_number: req.body.chair_number,
      date_of_appointment: req.body.date_of_appointment,
      total_price: req.body.total_price,
      appointment_status:
        req.body.appointment_status != null
          ? req.body.appointment_status
          : "BOOKED",
      slot_id: req.body.slot_id,
      appointment_details: {
        createMany: {
          data: req.body.appointment_details,
        },
      },
    },
    include: {
      appointment_details: true,
    },
  });

  res.status(200).json(newAppointment);
};

const getAllAppointments = async (req, res) =>
  res.json(
    await prisma.appointments.findMany({
      orderBy: [
        {
          appointment_id: "desc",
        },
      ],
      include: {
        appointment_details: true,
      },
    })
  );

const getAllAppointmentDetails = async (req, res) =>
  res.status(200).json(
    await prisma.appointment_details.findMany({
      orderBy: [
        {
          service_id: "desc",
        },
      ],
      select: {
        service_id: true,
        appointments: {
          select: {
            user_id: true,
            //   appointment_status: true
          },
        },
        services: {
          select: {
            service_name: true,
            //   service_price: true
          },
        },
      },
    })
  );

const getAppointmentsForUser = async (req, res) =>
  res.status(200).json(
    await prisma.appointments.findMany({
      select: {
        appointment_id: true,
        appointment_stamp: true,
        total_price: true,
        date_of_appointment: true,
        appointment_status: true,
        appointment_details: {
          select: {
            services: {
              select: {
                service_name: true,
                service_price: true,
              },
            },
          },
        },
        salon: {
          select: {
            salon_name: true,
            logo: true,
          },
        },
        slots: {
          select: {
            start_time: true,
          },
        },
      },
      where: {
        user_id: req.params.id,
      },
      orderBy: [
        {
          appointment_id: "desc",
        },
      ],
    })
  );

const getAppointmentsForSalon = async (req, res) =>
  res.status(200).json(
    await prisma.appointments.findMany({
      select: {
        appointment_id: true,
        chair_number: true,
        appointment_stamp: true,
        total_price: true,
        slots: {
          select: {
            start_time: true,
          },
        },
        users: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        appointment_details: {
          select: {
            services: {
              select: {
                service_name: true,
                service_price: true,
              },
            },
          },
        },
      },
      where: {
        salon_id: parseInt(req.params.id),
        date_of_appointment: req.params.date + "T00:00:00.000Z",
      },
    })
  );

module.exports = {
  getAllSlotsByChairNo,
  getAllSlots,
  getAllAppointments,
  getAppointmentsForSalon,
  getAllAppointmentDetails,
  createNewAppointment,
  getAppointmentsForUser,
};
