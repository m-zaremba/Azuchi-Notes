import React from 'react';
import firebase from 'react-native-firebase';
import Svg, { Rect, Circle } from 'react-native-svg';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddSerie from './AddSerie';
import Main from './Main';
import SerieModal from 'react-native-modal';

export default class Serie extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSerieModal: false,
    }
  }


  handleSerieModal = () => {
    this.setState({
      showSerieModal: true,
    })
  };

  setModalInvisible() {
    this.setState({
      showSerieModal: false,
    })
  }

  handleDelete = () => {
    Alert.alert(
      '',
      'Delete selected?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'Delete', onPress: () => this.props.doc.ref.delete() }
      ],
      { cancelable: false }
    );
  };

  render() {

    return (
      <TouchableOpacity
        onPress={() => {
          this.handleSerieModal();
        }}
        onLongPress={() => {
          this.handleDelete();
        }}
      >
        <>
          <View style={styles.serieRow}>
            <Text style={styles.text}>{this.props.date}</Text>
            <View style={styles.serieView}>
              <Icon name={`${this.props.accuracy[0]}`} size={30} style={styles.listIcon} />
              <Icon name={`${this.props.accuracy[1]}`} size={30} style={styles.listIcon} />
              <Icon name={`${this.props.accuracy[2]}`} size={30} style={styles.listIcon} />
              <Icon name={`${this.props.accuracy[3]}`} size={30} style={styles.listIcon} />
            </View>
          </View>
          <SerieModal animationType='slide' transparent={true} visible={this.state.showSerieModal} style={{width: '100%', height: '100%', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0}} >
            <TouchableOpacity activeOpacity={1}
              onPress={() => this.setModalInvisible()} >
              <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(85, 85, 85, 0.95)' }} >
                {this.props.coordinates.map((e, i) => {
                  if (i === 0) {
                    return (
                      <View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'red'}} />
                    );
                  } else if (i === 1) {
                    return (
                      <View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'green'}} />
                    );
                  } else if (i === 2) {
                    return (
                      <View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'blue'}} />
                    );
                  } else {
                    return (
                      <View key={i} style={{...styles.shotMarker, top: e.posY + 36, left: e.posX + 16, backgroundColor: 'violet'}} />
                    );
                  }
                })}
                <View style={{flex: 6, alignItems: 'center', zIndex: 1, justifyContent: 'flex-end', paddingTop: 45}} >
                  <Svg width='100%' height='100%' viewBox='0 0 100 100'>
                    <Rect
                      disabled='true'
                      width={100}
                      height={100}
                      fill='rgb(49, 50, 47)'
                    />
                    <Circle
                      disabled='true'
                      x={23}
                      y={23}
                      r={23}
                      cx={27}
                      cy={40}
                      fill='black'
                    />
                    <Circle
                      disabled='true'
                      x={18}
                      y={18}
                      r={18}
                      cx={32}
                      cy={45}
                      fill='white'
                    />
                    <Circle
                      disabled='true'
                      x={14}
                      y={14}
                      r={14}
                      cx={36}
                      cy={49}
                      fill='black'
                    />
                    <Circle
                      disabled='true'
                      x={12}
                      y={12}
                      r={12}
                      cx={38}
                      cy={51}
                      fill='white'
                    />
                    <Circle
                      disabled='true'
                      x={8}
                      y={8}
                      r={8}
                      cx={42}
                      cy={55}
                      fill='black'
                    />
                    <Circle
                      disabled='true'
                      x={4}
                      y={4}
                      r={4}
                      cx={46}
                      cy={59}
                      fill='white'
                    />
                  </Svg>
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                  <View style={{ flex: 1 }} />
                  <View style={styles.arrowsCount}>
                    <Text style={styles.modalText}>1st Arrow</Text>
                    <Text style={styles.modalText}>2nd Arrow</Text>
                  </View>
                  <View style={styles.icons}>
                    {this.props.accuracy.length >= 1 ? (
                      <Icon
                        style={{ width: '50%', textAlign: 'center' }}
                        name={`${this.props.accuracy[0]}`}
                        size={40}
                        color='red'
                      />
                    ) : null}
                    {this.props.accuracy.length >= 2 ? (
                      <Icon
                        style={{ width: '50%', textAlign: 'center' }}
                        name={`${this.props.accuracy[1]}`}
                        size={40}
                        color='green'
                      />
                    ) : null}
                  </View>
                  <View style={styles.arrowsCount}>
                    <Text style={styles.modalText}>3rd Arrow</Text>
                    <Text style={styles.modalText}>4th Arrow</Text>
                  </View>
                  <View style={styles.icons}>
                    {this.props.accuracy.length >= 3 ? (
                      <Icon
                        style={{ width: '50%', textAlign: 'center' }}
                        name={`${this.props.accuracy[2]}`}
                        size={40}
                        color='blue'
                      />
                    ) : null}
                    {this.props.accuracy.length >= 4 ? (
                      <Icon
                        style={{ width: '50%', textAlign: 'center' }}
                        name={`${this.props.accuracy[3]}`}
                        size={40}
                        color='violet'
                      />
                    ) : null}
                  </View>
                  <View style={styles.note}>
                    <Text style={{...styles.modalText, fontSize: 20, textAlign: 'left'}}>{`Notes:\n${this.props.note}`}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </SerieModal>
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
    fontSize: 20,
    color: 'black'
  },
  serieView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  arrowsCount: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 4,
    paddingRight: 10,
    alignItems: 'center'
  },
  shotMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    zIndex: 2,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 4,
    paddingRight: 10,
    alignItems: 'flex-start'
  },
  modalText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    flex: 1
  },
  listIcon: {
    color: 'black',
    textAlign: 'center',
    width: 30
  },
  note: {
    flex: 2,
    width: '90%',
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'black'
  }
});
