# cara-api
The official REST API for Cara

For upper banner:
{{cara-api}}/advertisments/upperbanner/:zipcode
{{cara-api}}/recommendations/salons/:zipcode
{{cara-api}}/api/v1/search/salons/:keyword
{{cara-api}}/api/v1/salons/:salonId
{{cara-api}}/api/v1/appointments/slots/:id/:date
{{cara-api}}/api/v1/appointments/slots/:id/:date/:chair

!IMPORTANT
You have to manually include uploads folder and its subfolders.
Right now only dev branch has manually included the folders mentioned above and production branch is created from dev branch.
Development will be done in dev branch and when the time comes to update the api, make sure to create a new branch to push changes or to update the production branch.