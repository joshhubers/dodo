# dodo

## Setup

    git clone https://github.com/joshhubers/dodo
    cd dodo
    docker-compose up --build
    soure .environment
    do_bx_seq db:create
    do_bx_seq db:migrate
    do_bx_seq db:seed:all

Clone the repository. Docker up build to build and run the project. Source the environment file to use handy commands. Execute Sequelize commands to create and seed database.

Visit
    localhost:4202

Login with demo
    Email: john@doe.email.com
    Password: abc123

## Intent

I am building this software as a learning experience to expand my knowledge of node js, graphql, and web authentication (all things I currently have little experience in). As such there will be ugly code, terrible patterns, and so far no tests.

## Path To MVP
 - User roles and permissions (In anticipation of invite system)
 - User project invite system
 - Photo/File uploads
 - User project notes
 - User creation/invites to application

## Bugs I don't want to fix right now, but should return to
 - Inviting a user doesn't mark the button as 'sent'
 - Login/logout redirect is broken
 - Cascading deletes
