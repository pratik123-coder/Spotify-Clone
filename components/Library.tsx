"use-client";
import { TbPlaylist } from "react-icons/tb";
import {AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModel";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import ListItem from "./ListItem";

interface LibraryProps{
  songs: Song[];
}
const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const AuthModel = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const onClick = () => {
    if (!user){
      return AuthModel.onOpen();
    }
    //Check For Subscription

    return uploadModal.onOpen();
  };
  return(
    <div className="flex flex-col">
      <div className="flex item-center justify-between px-5 pt-4">
      <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">
            Your Library
          </p>
      </div>
      <AiOutlinePlus
        onClick={onClick}
        size={20}
        className="text-neutral-400 cursor-pointer hover:text-white transition"
      />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
      <ListItem
                image="/images/liked.png"
                name="Liked songs"
                href="liked"
              />
          {songs.map((item)=>(
            <MediaItem 
            onClick={(id:string) => onPlay(id) }
            key={item.id}
            data={item}
            />
          ))}
      </div>
    </div>
  );
}

export default Library;