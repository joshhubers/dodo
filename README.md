# dodo - The project management app to make all others extinct

## Setup

    git clone https://github.com/joshhubers/dodo
    cd dodo
    docker-compose up --build
    soure .environment
    do_bx_seq db:create
    do_bx_seq db:migrate
    do_bx_seq db:seed:all

Clone the repository. Docker up build to build and run the project. Source the environment file to use handy commands. Execute Sequelize commands to create and seed database.

## Intent

I am building this software as a learning experience to expand my knowledge of node js, graphql, and web authentication (all things I currently have little experience in). As such there will be ugly code, terrible patterns, and so far no tests.
