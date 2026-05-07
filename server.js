const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
//It is used for cross origin resource sharing 
app.use(express.json());
//incomming json data to js obj ... 

//Here my ab connection is giving some error so that is why I am using fake data ... 
let students = [
  {
    id: 1,
    name: "Ishika",
    email: "ishika@gmail.com",
    course: "React"
  },
  {
    id: 2,
    name: "Aanshi",
    email: "aanshi@gmail.com",
    course: "Node"
  }
];


//Here we are getting the students data .... 
//Here I am sending json data from backend to frontend ... 
app.get("/students", (req, res) => {
  res.json(students);
});


//Sending a post request to add data ... 
app.post("/students", (req, res) => {

  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    course: req.body.course
  };

  students.push(newStudent);
  //The array newStudent will be pushed in students main array 

  res.json({
    message: "Student Added",
    student: newStudent
  });
});


//Here i am writing end point for updating student 
app.put("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);
  //Here it will be accepting the id send in the parameters of req.... 
  //We will be converting it to int from string .... 

  students = students.map((student) => {

    if (student.id === id) {
      return {
        ...student,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course
      };
    }
    //Here spread operator is been used ... 
    //Here we are keepding the student array old array as it is and just adding the updated fields.... 
    //It is used as we can easy merge filed without updating all fields ... 

    return student;
  });

  res.json({
    message: "Student Updated"
  });
});


//It is used for deleting student data ..... 
app.delete("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);

  students = students.filter((student) => student.id !== id);

  res.json({
    message: "Student Deleted"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

