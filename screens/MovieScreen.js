import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "./../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-5";
var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavorite, toggleFavorite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    console.log("itemid: ", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("Got Movie Details: ", data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("Got Movie Credits: ", data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("Got Similar Movies: ", data);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back Button and Movie Poster  */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={{
              uri: image500(movie?.poster_path) || fallbackMoviePoster,
            }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* Movie Details View  */}
      {loading ? (
        <Loading />
      ) : (
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* Title  */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>

          {/* Status, Relaease, Runtime  */}
          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie.release_date?.split("-")[0]} •{" "}
              {movie?.runtime} min
            </Text>
          ) : null}

          {/* Genres  */}
          <View className="flex-row flex-wrap justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre?.name} {showDot ? "•" : null}
                </Text>
              );
            })}
          </View>

          {/* Description  */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>
      )}

      {/* Cast  */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* Similar Movies  */}
      {similarMovies.length > 0 && <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />}
    </ScrollView>
  );
}
