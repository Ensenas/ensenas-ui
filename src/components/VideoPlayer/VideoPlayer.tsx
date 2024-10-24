import React from 'react'

interface VideoPlayerProps {
    src: string;
    onEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded }) => {
    return (
        <video width="300" height="500" controls onEnded={onEnded}>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default VideoPlayer
