import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';

const MyVideo = ({url, width, height}) => {
     // Later on in your styles..
    var styles ={
        backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: height,
        width: width
        },
    }
    const onVideoEnd = (data)=>{
        console.log("data: ", data);
        
    }
    return (
     <Video source={{uri: url}}   // Can be a URL or a local file.
                // ref={(ref) => {
                // this.player = ref
                // }}                                      // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                // fullscreen = {true}
                resizeMode="cover"
                onEnd={onVideoEnd}
                />
                
    );
}
 
export default MyVideo;