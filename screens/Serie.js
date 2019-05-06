import React from 'react';
import firebase from 'react-native-firebase';

import { View, Text, StyleSheet, TouchableOpacity,  Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import AddSerie from './AddSerie';
import Main from './Main';

export default class Serie extends React.PureComponent {

  setModalVisible() {
    this.props.doc.ref.update({
            modalVisible: !this.props.modalVisible,
        });
  }

   render(){

       return (
         <TouchableOpacity onPress={() => {
           this.setModalVisible()}} >
           <>
              <View style={styles.serieRow}>
                      <Text style={ styles.text }>{this.props.date}</Text>
                      <View style={styles.serieView}>
                      <Icon name={`${this.props.accuracy[0]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[1]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[2]}`} size={30} color='black'/>
                      <Icon name={`${this.props.accuracy[3]}`} size={30} color='black'/>
                      </View>
              </View>
              <Modal
               animationType="slide"
               transparent={true}
               visible={this.props.modalVisible}
               >
               <View style={{marginTop: 22, width: '92%', height: '95%', backgroundColor: 'rgba(244, 222, 107, 0.9)', marginLeft: '4%', borderRadius: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                 <View>
                   <Text style={{fontSize: 20, color: 'black'}}>{this.props.accuracy}</Text>

                   <TouchableOpacity
                     onPress={() => {
                       this.setModalVisible()
                     }}>
                     <Text>Hide Modal</Text>
                   </TouchableOpacity>
                 </View>
               </View>
             </Modal>
             </>
        </TouchableOpacity>
        );
   }
 }

 const styles = StyleSheet.create({
   serieRow: {
       height: 60,
       marginTop: 3,
       marginLeft: 5,
       paddingLeft: 15,
       paddingRight: 15,
       marginRight: 5,
       borderRadius: 10,
       backgroundColor: 'rgba(255, 255, 255, 0.85)',
       justifyContent: 'space-between',
       alignItems: 'center',
       flexDirection: 'row',
 },
   text: {
     fontSize: 24,
     color: 'black'
   },
   serieView: {
     flexDirection: 'row',
     alignItems: 'center'
   }
 });
