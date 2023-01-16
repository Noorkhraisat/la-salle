import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconComponentProvider } from '@react-native-material/core';
import { ThemeProvider } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import AddSubject from './src/pages/AddSubject';
import AddUser from './src/pages/AddUser';
import Dashboard from './src/pages/Dashboard';
import LoginForm from './src/pages/LoginForm';

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
  return (
    <ThemeProvider theme={theme}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <View style={
          {
            height: '100%',
            width: '100%',
            display: 'flex',
            color: 'white',
            backgroundColor: "#e6e6e6",

          }
        }

        >

          <NativeRouter>
            <Routes>
              <Route exact path="/" element={<AddSubject />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/AddUser" element={<AddUser />} />


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
