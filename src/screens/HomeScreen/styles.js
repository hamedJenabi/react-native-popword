import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  body: {
    flex: 1,
    marginTop: 50,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  optionDots: {
    width: 25,
    height: 22,
  },
  pickerContainer: {
    backgroundColor: '#e6fffc',
    borderRadius: 25,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#009688',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBack: {
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
  },
  entityContainer: {
    backgroundColor: '#e6fffc',

    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#1affe4',
    padding: 16,
    marginBottom: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.01,

    elevation: 1,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
  text: {
    fontSize: 18,
    paddingBottom: 15,
    alignSelf: 'center',
    color: '#333333',
  },

  scrollView: {
    marginHorizontal: 20,
  },
  backTextWhite: {
    alignSelf: 'center',
    color: '#FFF',
    textAlign: 'center',
  },

  backRightBtn: {
    bottom: 0,
    maxHeight: 70,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 125,
    borderRadius: 4,
    backgroundColor: 'red',
    right: 0,
    borderRadius: 4,
  },
});
