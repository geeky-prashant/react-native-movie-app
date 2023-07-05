import { View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { theme } from "./../theme/index";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={6} size={80} color={theme.background} />
    </View>
  );
}
