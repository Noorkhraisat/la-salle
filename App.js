import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconComponentProvider } from '@react-native-material/core';
import { ThemeProvider } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import LoggedInContainer from './src/components/loggedInContainer';
import AddAnnouncment from './src/pages/admin/addAnnouncment';
import AddSubject from './src/pages/admin/AddSubject';
import AddUser from './src/pages/admin/AddUser';
import AllStudents from './src/pages/admin/AllStudents';
import Dashboard from './src/pages/Dashboard';
import AllTeachers from './src/pages/director/AllTeachers';
import AllStudentsOfSection from './src/pages/headOfSection/AllStudentsOfSection';
import AllTeachersOfSection from './src/pages/headOfSection/AllTeachersOfSection';
import LoginForm from './src/pages/LoginForm';
import ChildsList from './src/pages/parents/ChildsList';
import Profile from './src/pages/Profile';
import Announcments from './src/pages/student/Announcments';
import GetStudentSubject from './src/pages/student/getStudentSubject';
import StudentHomeworks from './src/pages/student/StudentHomeworks';
import StudentMarks from './src/pages/student/StudentMarks';
import GetHomeWorksByTeacher from './src/pages/teacher/GetHomeWorksByTeacher';
import GetStudentsBySubject from './src/pages/teacher/getStudentsBySubject';
import GetSubjectsByTeacher from './src/pages/teacher/getSubjectsByTeacher';
import PlanningForLessons from './src/pages/teacher/PlanningForLessons';
import WorkOfTheMonth from './src/pages/teacher/WorkOfTheMonth';
export default function App() {
  const theme = {
    colors: {
      primary: '#fff',
      main: '#fff',
      secondary: '#fff',
      light: "#fff",
      lighter: "#fff",


    }
  }
  const [open, setOpen] = useState(false)
  // const navigate = useNavigate()
  console.warn = () => { }
  console.error = () => { }


  return (
    <ThemeProvider theme={theme}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>



        <View style={
          {
            height: '100%',
            width: '100%',
            display: 'flex',
            color: 'white',
            marginTop: 0,
            marginBottom: 'auto',
            backgroundColor: "#e6e6e6",

          }
        }

        >
          <NativeRouter>
            <Routes>
              <Route exact
                path="/"
                element={<LoggedInContainer>
                  <LoginForm />
                </LoggedInContainer>
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/Dashboard" element={<LoggedInContainer><Dashboard /></LoggedInContainer>} />
              <Route path="/AddUser" element={<LoggedInContainer><AddUser /></LoggedInContainer>} />
              <Route path="/StudentSubjects" element={<LoggedInContainer><GetStudentSubject /></LoggedInContainer>} />
              <Route path="/AddHomework" element={<LoggedInContainer><GetHomeWorksByTeacher /></LoggedInContainer>} />
              <Route path="/StudentHomeworks" element={<LoggedInContainer><StudentHomeworks /></LoggedInContainer>} />
              <Route path="/Announcments" element={<LoggedInContainer><Announcments /></LoggedInContainer>} />
              <Route path="/addAnnouncment" element={<LoggedInContainer><AddAnnouncment /></LoggedInContainer>} />
              <Route path="/AddSubject" element={<LoggedInContainer><AddSubject /></LoggedInContainer>} />
              <Route path="/GetSubjectsByTeacher" element={<LoggedInContainer><GetSubjectsByTeacher /></LoggedInContainer>} />
              <Route path="/GetSubjectsByTeacher" element={<LoggedInContainer><GetSubjectsByTeacher /></LoggedInContainer>} />
              <Route path="/GetStudentsBySubject" element={<LoggedInContainer><GetStudentsBySubject /></LoggedInContainer>} />
              <Route path="/StudentMarks" element={<LoggedInContainer><StudentMarks /></LoggedInContainer>} />
              <Route path="/PlanningForLessons" element={<LoggedInContainer><PlanningForLessons /></LoggedInContainer>} />
              <Route path="/AllStudents" element={<LoggedInContainer><AllStudents /></LoggedInContainer>} />
              <Route path="/AllTeachers" element={<LoggedInContainer><AllTeachers /></LoggedInContainer>} />
              <Route path="/WorkOfTheMonth" element={<LoggedInContainer><WorkOfTheMonth /></LoggedInContainer>} />

              <Route path="/studentOfTheSection" element={<LoggedInContainer><AllStudentsOfSection/></LoggedInContainer>} />
              <Route path="/teachersOfTheSection" element={<LoggedInContainer><AllTeachersOfSection /></LoggedInContainer>} />
              <Route path="/ChildsList" element={<LoggedInContainer><ChildsList /></LoggedInContainer>} />

              <Route path="/Profile" element={<LoggedInContainer><Profile /></LoggedInContainer>} />



            </Routes>
          </NativeRouter>
        </View>

      </IconComponentProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
