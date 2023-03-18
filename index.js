const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList=[]
const teamMembers=[]

const appMenu = () =>{
  function buildTeam(){
      if (!fs.existsSync(OUTPUT_DIR))
      {
          fs.mkdirSync(OUTPUT_DIR);
      }
   fs.writeFileSync(outputPath,render(teamMembers),'utf-8');
  }
  
  
    function addIntern(){
        inquirer.prompt([
            {
             type: 'input',
             name: 'internName',
             message: "what is interns name?",
    
        },
        {
            type: 'input',
            name: 'internId',
            message: "what is interns Id?",
    
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "what is intern Email?",
    
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "what is interns School?",
    
        }
        ]).then((answers) =>{
            const intern =new Intern(answers.internName,
                answers.internId,
                answers.internEmail,
                answers.internSchool)
            //console.log(engineer);
            teamMembers.push(intern);
            idList.push(answers.internId);
            //console.log(intern);
            createTeam();
            })

   }
   
   function addEngineer(){
    inquirer.prompt([
        {
         type: 'input',
         name: 'engineerName',
         message: "what is engineers name?",

    },
    {
        type: 'input',
        name: 'engineerId',
        message: "what is engineers Id?",

    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "what is engineers Email?",

    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "what is engineers Github?",

    }
    ]).then((answers) =>{
        const engineer =new Engineer(answers.engineerName,answers.engineerId,answers.engineerEmail,answers.engineerGithub)
        //console.log(engineer);
        teamMembers.push(engineer);
        idList.push(answers.engineerId);
        //console.log(engineer);
        createTeam();
        })
}
   
   
    function createTeam(){
        inquirer.prompt([
            {
             type: 'list',
             name: 'memberChoice',
             message: "Which type of employee would you like to add to the team?",
             choices: [ 'Engineer', 'Intern', 'END OF THE TEAM CATAGORY']
            }
        ]).then(userChoice =>{
        if(userChoice.memberChoice === "Engineer"){
            //add engineer
            
            addEngineer();

         }else if(userChoice.memberChoice==="Intern"){
            //add intern
            addIntern();
         }else {
            // build team
            buildTeam();


        }

        })
    }



     function createManager()
     {
         console.log("Please build your TEAM!");
       inquirer.prompt([
           {
            type: 'input',
            name: 'managerName',
            message: "Please enter the manager's name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the manager's name!");
                    return false;
                }
            }
           },
           {
            type: 'input',
            name: 'managerId',
            message: "Please enter the manager's id",
           },
           {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's emailAddress?",
           },
           {
            type: 'input',
            name: 'managerContact',
            message: "Please enter the manager's office number",
           },




       ]).then((answers)=>{
        const manager =new Manager(answers.managerName,answers.managerId,answers.managerEmail,answers.managerContact)
        console.log(manager);
        teamMembers.push(manager);
        idList.push(answers.managerId);
        createTeam();
        });
     }
     createManager();
};
appMenu();
