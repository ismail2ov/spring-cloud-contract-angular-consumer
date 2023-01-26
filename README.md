# Angular example with Docker Spring Cloud Contract Stub Runner

This is a simple example of how to use Spring Cloud Contract to create a contract between a Spring application (_which is the **Producer**_) and an Angular application (_which is the **Consumer**_).

## Producer

We have created a simple application with Spring Boot that does not yet have an implementation, but we have the contracts to be able to create the contracts.

### Create the stubs

- Go to the catalog folder  
``` shell
 cd catalog
```  

- Compile and package the code skipping the tests because we don't have any logic implemented yet  
``` shell
 mvn clean package
```  

- Build Docker image with the stubs  
``` shell
 docker build -f StubrunnerDockerfile --tag ismail2ov/ecommerce-catalog-stubs .
```


## Consumer
We have created a simple Angular eCommerce backend with integration tests that use stub runner as mock server.  

### Run the integration tests

- Go to the eCommerce folder  
``` shell
 cd ecommerce
```  

- Installs a package and any packages that it depends on  
``` shell
 npm install
```

- Run the integration tests  
``` shell
 npm run integration-tests
```

### Run the project

- Run the stub runner 
``` shell
 docker run -d --rm  --name ecommerce-catalog-stub-server -p 8080:8080 ismail2ov/ecommerce-catalog-stubs
```

- Run the Angular project
``` shell
 npm start
```

- Open in your browser the path [http://localhost:4200/](http://localhost:4200/) to see the UI

- Stop the stub runner
``` shell
 docker stop ecommerce-catalog-stub-server
```

## More info
- https://github.com/ismail2ov/contract-testing-demo
- https://github.com/ismail2ov/docker-spring-cloud-contract-stub-runner
- https://hub.docker.com/r/ismail2ov/spring-cloud-contract-stub-runner
- https://github.com/ismail2ov/docker-spring-cloud-contract-stub-runner-examples

