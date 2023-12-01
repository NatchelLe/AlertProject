// import React, { useState,TurboModuleRegistry  } from 'react';

// import { View, Image, TouchableOpacity, Text } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';

// const ProfileImage = () => {
//   const [image, setImage] = useState(null);
  

//   const pickImage = () => {
//     ImagePicker.openPicker({
//       width: 150,
//       height: 150,
//       cropping: true,
//       cropperCircleOverlay: true,
//       compressImageQuality: 0.7,
//     })
//       .then((image) => {
//         console.log(image);
//         setImage({ uri: image.path });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {image && <Image source={image} style={{ width: 150, height: 150, borderRadius: 75 }} />}
//       <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
//         <Text style={{ fontSize: 24, color: 'blue' }}>Pick Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileImage;
