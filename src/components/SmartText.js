import { useState } from "react";
 const SmartText = ({ text='', length = 170 }) => {
  const [showLess, setShowLess] =useState(true);

if(text){
  if (text.length < length) {
    return <div
    dangerouslySetInnerHTML={{
      __html: text,
    }}
 >
  
</div>
  }
}

 
  return (
    <div
        dangerouslySetInnerHTML={{
          __html: `${text?text.slice(0, length)+'...':''}`,
        }}
     >
      
    </div>
  );
};

export default SmartText