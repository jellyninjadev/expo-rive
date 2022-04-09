import React, { useEffect, useRef, useState } from 'react'
import Rive, { LoopMode, RiveRef } from 'rive-react-native'
import { useAssets } from 'expo-asset'
import { SafeAreaView, View, Text, Animated, ActivityIndicator } from 'react-native'

const Content = () => {
  const opacity = useRef(new Animated.Value(0))
  const animation = useRef(Animated.timing(opacity.current, {
    toValue: 100,
    duration: 2000,
    useNativeDriver: true
  }))
  return (
    <Animated.View onLayout={() => {
      animation.current.start()
    }} style={{opacity: opacity.current}}>
      <SafeAreaView>
        <View style={{paddingHorizontal: 8, paddingTop: 12}}>
        <Text style={{color: 'white', fontSize: 52, fontWeight: 'bold'}}>Content</Text>
        </View>
        </SafeAreaView>
    </Animated.View>
  );
};

export default () => {
  const opacity = useRef(new Animated.Value(100))
  const [loading, setLoading] = useState(true)
  const [assets, error] = useAssets([require('./illustrations.riv'), require('./spinner.riv')])
  const fade = useRef(Animated.timing(opacity.current, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: true
  }))

  useEffect(() => {
    console.log('animation started')
    fade.current.start(() => {
      console.log('animation finished')
      setLoading(false)
    })
  }, [])

  if (!assets) return <ActivityIndicator />

  return <View style={{flex: 1,backgroundColor: '#FFFBF6'}}>
    <View style={{flex: 1, flexGrow: 0.9, backgroundColor: '#49B5F2'}}>
      {loading ? 
        <Animated.View style={{opacity: opacity.current, flex: 1}}><Rive url={assets?.[1].localUri!} autoplay={true} /></Animated.View>
        : <Content />
      }
    </View>
    <SafeAreaView style={{flex: 1, flexGrow: 0.1, flexDirection: 'row', alignItems: 'center', borderTopColor: '#e2e2e2', borderTopWidth: 1}}>
      <Rive url={assets?.[0].localUri!} autoplay={true} artboardName="scan" />
      <Rive url={assets?.[0].localUri!} autoplay={true} artboardName="cards" />
      <Rive url={assets?.[0].localUri!} autoplay={true} artboardName="shoppingBasket" />
    </SafeAreaView>
  </View>
}