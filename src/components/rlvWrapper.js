import React, { useState, useEffect } from 'react'
import {View, Text, Dimensions} from 'react-native'
import {RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import axios from 'axios';
import streamigVideosApi from '../api/streamingVideos'
import MyVideo from './MyVideo';

const RLVWrapper = () => {
    
    let { width, height } = Dimensions.get('window');
    const [data, updateData] = useState(['ABC', 'DEF'])
    const [pageNo, setpageNo] = useState(0)
    
    const onEndReached = () =>  {
        console.log("New page");
        setpageNo(pageNo+1)
    }

    useEffect(() => {
        
        (async ()=>{
            try {
                console.log("pageChanged", pageNo);
                
                let newPageResData = await fetchVideos(pageNo)
                let newData = null
                
                if(pageNo==0)
                    newData = [...newPageResData.data]
                else 
                    newData = [...data, ...newPageResData.data]
                updateData(newData)
            } catch (error) {
                console.log(error);
                
            }
        })()
        
    }, [pageNo])

    const fetchVideos = async (pageNo) => {
        return await axios.post(streamigVideosApi.playbackVideoUrls, {"page": pageNo})
    }

    const dataDataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(data);
    
    const layoutProvider = new LayoutProvider(
      () => 0,
      (type, dim) => {
        dim.width = width;
        flex = 1;
        dim.height = height;
      },
    );
  
    const rowRenderer = (type, data) => {
        if (data.playbackUrl)
            return <>
                    <Text>{data.playbackUrl}</Text>
                    <MyVideo url={data.playbackUrl} />
                    </>;
        else
            return <></>
    };

    return (  
        <View
        style={{
          display: "flex",
          flex: 1,
          width: width,
          height: '100%'
        }}
      >
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataDataProvider}
          rowRenderer={rowRenderer}
          onEndReachedThreshold={50}
          onEndReached={onEndReached}
        />
      </View>

    );
}
 
export default RLVWrapper;