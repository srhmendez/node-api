# To Do Application
Created by Team SKEMA 

## API for To Do App Documentation:
```node /Routes/todos.js```

## To Do Endpoints


### Get a List of All Todos
``` GET /todos/ ```



### Add a To Do 
``` POST /todos/ ```



### Edit/Update a To Do 
``` PUT /todos/ ```



### Delete a To Do
``` DELETE /todos/:id ```

**Path Parameters**
|      :id        | number |
|-----------------|--------|
| Example:        |    4   |



### Get all To Dos for a Category
``` GET /todos/:category ```

**Path Parameters**
|    :category    | string |
|-----------------|--------|
| Example:        | Health |




### Get Categories
``` GET /todos/category/all ```



### Edit/Update Categories
``` PUT /todos/category/edit/:category ```

**Path Parameters**
|    :category    | string |
|-----------------|--------|
| Example:        | Health |



### Delete Categories
``` GET /todos/category/delete/:category ```

**Path Parameters**
|    :category    | string |
|-----------------|--------|
| Example:        | Health |




