import Home from "./Page/Home";
import Login from './Companents/Users/Login';
import CreateStory from "./Companents/Story/CreateStory";
import CreatePost from "./Companents/Post/CreatePost";
import UserProfile from "./Page/UserProfile";
import UpdateProfile from "./Companents/Users/UpdateProfile";
import UpdatePost from "./Companents/Post/UpdatePost";
import DeletePost from "./Companents/Post/DeletePost";
import Followers from "./Companents/Users/Followers";
import Following from "./Companents/Users/Following";
import Comments from "./Companents/Comment/Comments";
import FavoritePost from "./Companents/Post/FavoritePost";
import ProfileImage from "./Companents/Users/ProfileImage";
import MyStory from "./Companents/Story/MyStory";
import Demo from "./Companents/DEmo";
import {Route,Routes} from 'react-router-dom';
import BodyUsers from "./UserList/BodyUsers";
import Chat from "./Companents/Chat/Chat";
import SearchUser from "./UserList/SearchUser";
import ImageSearch from "./Companents/ImageSearch";
import ReadingBook from "./Companents/MyBook/ReadingBook";
import PasswordGenerate from "./Companents/PasswordGanarate/Password";
import NotificationPage from "./Companents/Notifications/NotificationPage";
import Templates from "./multplie";
import BookStatistic from "./Companents/BookCatagory/BookStatistic";
import Followinguser from "./Companents/Follow/Followinguser";
import AnimatedMulti from "./Companents/NeedCompanents/Mentioned";
import VideoCard from "./card";
import MainTelegram from "./Companents/Telegram/MainTelegram";
import GroupEdit from "./EditGroup";
import PostSearch from "./Companents/Post/PostSearch";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="demo" element={<Demo />} />
      <Route path="searchimage" element={<ImageSearch />} />
      <Route path="feed"  element={<Home />} />
      <Route path="createstory"  element={<CreateStory />} />
      <Route path="seestory"  element={<MyStory />} />
      <Route path="createpost"  element={<CreatePost />} />
      <Route path="followers/:id"  element={<Followers />} />
      <Route path="following/:id"  element={<Following />} />
      <Route path="profile/:id"  element={<UserProfile />} />
      <Route path="updateprofile"  element={<UpdateProfile />} />
      <Route path="post/update/:id" element={<UpdatePost />} />
      <Route path="comments/:id" element={<Comments />} />
      <Route path="profile/image/:id" element={<ProfileImage />} />
      <Route path="delete"  element={<DeletePost />} />
      <Route path="favorite/post"  element={<FavoritePost />} />
      <Route path="users/list"  element={<BodyUsers />} />
      <Route path="users/chat/:id"  element={<Chat />} />
      <Route path="users/search"  element={<SearchUser />} />
      <Route path="books/"  element={<ReadingBook />} />
      <Route path="password/"  element={<PasswordGenerate />} />
      <Route path="statistic/"  element={<BookStatistic />} />
      <Route path="follow/"  element={<Followinguser />} />
      <Route path="notification/"  element={<NotificationPage />} />
      <Route path="select/"  element={<Templates />} />
      <Route path="shex/" element={<AnimatedMulti />} />
      <Route path="video/" element={<VideoCard />} />
      <Route path="telegram/:id" element={<MainTelegram />} />
      <Route path="shexroz" element={<GroupEdit />} />
      <Route path="post/search" element={<PostSearch />} />

    </Routes>

  </>
  )
}

export default App;
