# Expense Tracker

## Time spent

The time to do this project has been spent as the following :

- Backend : 1h30m
- Frontend: 1h45m
- Readme : 10m

## Running the project

This project is using the following runtimes :

- .NET 7.0
- Node.js 18.0

### To run the project with containers (Recommanded)

1. Open the solution in Visual Studio.
2. Restore Nuget packages
3. Go to frontend and run `npm install`
4. Edit `frontend/src/config/config.ts` and set `API_URL` to the backend url (normally you only have to change the port)
5. In Visual Studio set `Startup project` as :
    - docker-compose (Action: start)
    - frontend (Action: start)
6. Click on Run

By following the steps above, the SQL Server container will be automatically created and the database will be created when the backend starts.

### To run the project without containers

1. Open the solution in Visual Studio.
2. Restore Nuget packages
3. Go to frontend and run `npm install`
4. Edit `frontend/src/config/config.ts` and set `API_URL` to the backend url (normally you only have to change the port to 5001)
5. Edit `ExpensesTracker/appsettings.json` and set `ConnectionStrings->SQLDatabase` to the value corresponding to your environnement
6. In Visual Studio set `Startup project` as :
    - ExepensesTracker (Action: start)
    - frontend (Action: start)
7. Click on Run

By following the steps above, the database will be created when the backend starts.

## Extensions

Backend

- Better Exception handling
- Use structured logging (Serilog)
- Decoupling the database from the API
- More validation in the database

Frontend

- Better UX (Notification, Multiple pages, ...)
- Better UI styling
- Better state management (React-Query, Redux)
