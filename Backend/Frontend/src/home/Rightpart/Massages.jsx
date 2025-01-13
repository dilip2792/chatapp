import React, { useEffect } from 'react';
import Massage from './Massage';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';
import { useRef } from 'react';
import useGetSocketMessage from '../../context/useGetSocketMessage.js';

const Massages = () => {
    const { loading, messages } = useGetMessage();
    useGetSocketMessage(),//listening incoming messages
    console.log("Messages:", messages);

    const lastMsgRef=useRef();
    useEffect(()=>{
        setTimeout(() => {
            if(lastMsgRef.current){
                lastMsgRef.current.scrllIntoView({ 
                    behaviour:'smooth', });
            }
        }, 100 );

    },[messages])

    return (
        <div
            className="py-2 flex-1 overflow-y-auto"
            style={{
                minHeight: "calc(92vh - 8vh)",
                scrollbarWidth: 'none'
            }}
        >
            {loading ? (
                <Loading />
            ) : (
                messages.length > 0 &&
                messages.map((message, index) => (
                    <Massage key={message._id || index} message={message} />
                ))
            )}
            {!loading && messages.length === 0 && (
                <div>
                    <p className="text-center mt-[20%]">Say! Hi to start conversation</p>
                </div>
            )}
        </div>
    );
};

export default Massages;
