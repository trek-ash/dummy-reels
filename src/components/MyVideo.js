import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';

const MyVideo = ({url, width, height}) => {
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
            // Handle video play ended, maybe auto scroll here!
    }
    return (
     <Video source={{uri: url}}   
                style={styles.backgroundVideo}
                resizeMode="cover"
                onEnd={onVideoEnd}
                />
                
    );
}
 
export default MyVideo;