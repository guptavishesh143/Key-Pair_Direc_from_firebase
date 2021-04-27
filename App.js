import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  Text,
  Button,
} from 'react-native'
import Background from '../components/Background'
import { theme } from '../core/theme'
//Imported Firebase Libraries
import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// import Logo from '../components/Logo'
// import Header from  '../components/Header'
import { FAB, Avatar, Card, Title, Appbar } from 'react-native-paper'
import LogoSmall from '../components/LogoSmall'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../components/CarouselCardItem'
import data from '../components/data'

//Dimensions
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Details({ navigation, route }) {
  var element = route.params.data
  //STATES
  const [ViewItems, setViewItems] = useState([])
  const [Datatems, setDatatems] = useState([])
  const [visible, setVisible] = React.useState(false)
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)
  
  useEffect(() => {
    LoadData()
  }, [])

  function LoadData() {
    console.log('asdasdadasdasd3')

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
    ]
    setViewItems(DATA)
  }

  function generateData(data) {
    const newData = Object.keys(data).reduce((result, currentKey) => {
      if (
        typeof data[currentKey] === 'string' ||
        data[currentKey] instanceof String
      ) {
        const elementToPush = List(currentKey, data[currentKey])
        result.push(elementToPush)
      } else {
        const nested = generateData(data[currentKey])
        result.push(...nested)
      }
      return result
    }, [])
    return newData
  }

  //Add User
  function AddUserData() {
    firestore()
      .collection('Filter')
      .add({
        id: '4',
        Question: 'What’s your budget?',
        SubQuestion: 'What is your monthly housing budget?',
        Results: [
          'Below 5.000',
          'Below 10.000',
          'Below 15.000',
          'Below 20.000',
          'Above 20.000',
        ],
      })
  }

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  function CarouselCards() {
    return (
      <>
        <View style={{ height: 340, backgroundColor: 'red' }}>
          <Carousel
            layout={'default'}
            layoutCardOffset={18}
            ref={isCarousel}
            data={data}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            //    useScrollView={true}
          ></Carousel>
          {/* <View style={{height:40}}> */}
          {/* <Pagination
            containerStyle={{ backgroundColor: 'transparent', marginTop: 0 }}
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,

              backgroundColor: '#4886FF',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          /> */}
          {/* </View> */}
        </View>
        <View style={{ padding: 20 }}>
          <View>
            <Text>{element.Heading}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 13, color: 'rgba(69, 51, 51, 1)' }}>
              Description about this place, this description will collaps and
              fold out when people click here…{' '}
            </Text>
          </View>
          <View style={{ paddingVertical: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>13,500</Text>
            <Text>Per Month</Text>
          </View>
        </View>
        <Button
          title="Upload Data"
          onPress={() => {
            AddUserData()
          }}
        />
      </>
    )
  }

  function List(key, value) {
    if (key == 'id') {
      return null
    }
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Image
              style={{ height: 20, width: 20 }}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1617646131875-0986960a4fb7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, color: theme.colors.primary }}>
              {key}
            </Text>
            <Text style={{ color: theme.colors.textFade, fontSize: 14 }}>
              {value}
            </Text>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      {/* <Appbar.Header style={{ backgroundColor: 'transparent' }}>
         <Appbar.BackAction onPress={() => {_goBack()}} />
      </Appbar.Header> */}
      <View style={{ justifyContent: 'center' }}>
        <FlatList
          // contentContainerStyle={{
           
          // }}
          ListHeaderComponent={CarouselCards()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={ViewItems}
          renderItem={({ item, index }) => (
            <View>
              {/* {(() => {
                return List(item)
              })()} */}
              {generateData(element)}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  // fab: {
  //   margin: 8,
  // },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 30,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    right: 0,
  },
})
