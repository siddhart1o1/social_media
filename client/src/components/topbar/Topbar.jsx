import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import MenuBar from "./MenuBar";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchComponent from "./Search";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [open, setOpen] = useState(false);
  const [AutoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const ref = useRef(null);
  const [myOptions, setMyOptions] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  useEffect(() => {
    const Array = [];
    try {
      const CALL_API = async () => {
        const response = await axios.get(
          `http://localhost:8800/api/search/user?q=${SearchInput}`
        );
        for (var i = 0; i < response.data.length; i++) {
          Array.push({
            username: response.data[i].username,
            profile_pic: response.data[i].profilePicture,
            id: response.data[i]._id,
          });
        }
        setMyOptions(Array);
      };

      if (SearchInput.length >= 3) {
        CALL_API();
      } else {
        setMyOptions([]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [SearchInput]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="logo_link" to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ZAMP</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            value={SearchInput}
            placeholder="Search for friend, post or video"
            className="searchInput"
            ref={ref}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setAutoCompleteOpen(true)}
          />
          {AutoCompleteOpen &&
          SearchInput.length >= 3 &&
          myOptions.length !== 0 ? (
            <div className="autoCompleteComponent">
              {AutoCompleteOpen && SearchInput.length >= 3
                ? myOptions.map((option) => {
                    return (
                      <Link key={option.id} to={`/profile/${option.username}`}>
                        <div className="searchOptionItem">
                          <div key={option.id} className="searchOption">
                            <div className="searchProfileUserName">
                              {option.username}
                            </div>
                            <img
                              src={
                                option.profile_pic
                                  ? PF + option.profile_pic
                                  : PF + "person/noAvatar.png"
                              }
                              alt="profile"
                              className="searchProfilePicture"
                            ></img>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : null}
            </div>
          ) : null}
          {/* <SearchComponent searchData={myOptions}></SearchComponent> */}
          <div className="searchDetails"></div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div>
            <ArrowDropDownIcon
              onClick={() => {
                setOpen(!open);
              }}
              style={{ color: open ? "aqua" : "black" }}
            ></ArrowDropDownIcon>
            {open ? <MenuBar /> : null}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
