import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../config";
import Comment from "../components/Comment/Comment";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const [commentItem, setCommentItem] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { avatar, username } = useSelector((state) => state.auth);
  const { capturedImage, postId } = route.params;
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("date")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      setAllComments(comments);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSendComment = async () => {
    if (!commentItem) {
      return Alert.alert("You can't post an empty comment");
    }
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const fullDate = `${date.getDate()} ${month} ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;

    await addDoc(collection(db, "posts", postId, "comments"), {
      commentItem,
      avatar,
      username,
      date: Date.now().toString(),
      time: fullDate,
    });
    setCommentItem("");
  };

  const isKeyboard = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.section}>
      <TouchableWithoutFeedback onPress={isKeyboard}>
        <View style={styles.createImgWrapper}>
          <Image source={{ uri: capturedImage }} style={styles.imgStyle} />
        </View>
      </TouchableWithoutFeedback>

      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Comment
            username={item.username}
            comment={item.commentItem}
            date={item.time}
            avatar={item.avatar}
          />
        )}
      />
      <TouchableWithoutFeedback onPress={isKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <View>
            <TextInput
              value={commentItem}
              style={styles.inputCreateComment}
              onFocus={() => setIsShownKeyboard(true)}
              onChangeText={(text) => setCommentItem(text)}
              placeholder="Коментувати..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
            />
            <View>
              <Pressable
                style={styles.sendCommentBtn}
                onPress={handleSendComment}
              >
                <AntDesign name="arrowup" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    maxWidth: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  createImgWrapper: {
    marginVertical: 32,
  },
  imgStyle: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 8,
    alignSelf: "center",
  },
  commentWrapper: {
    width: "55%",
    marginBottom: 24,
    padding: 16,
    flexGrow: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#00000008",
  },
  comment: {
    maxWidth: "100%",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  inputCreateComment: {
    height: 50,
    marginTop: 8,
    marginBottom: 16,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    backgroundColor: "#F6F6F6",
  },
  sendCommentBtn: {
    position: "absolute",
    bottom: 24,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
