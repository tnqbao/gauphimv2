import React, { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import { VideoPlayerProps } from "@/utils/types";

const VideoPlayer: React.FC<VideoPlayerProps> = ( {link_m3u8  , poster_url }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!playerRef.current) return;

        const art = new Artplayer({
            container: playerRef.current,
            url: link_m3u8,
            type: link_m3u8.endsWith(".m3u8") ? "m3u8" : "youtube",
            poster: poster_url,
            customType: {
                youtube: (video, url, art) => {
                    const videoId = new URL(url).searchParams.get("v");
                    const iframe = document.createElement("iframe");
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.frameBorder = "0";
                    iframe.allow =
                        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;
                    video.appendChild(iframe);

                    art.on("destroy", () => {
                        iframe.src = "";
                    });
                },
            },
            autoplay: false,
            autoSize: true,
            hotkey: true,
            controls: [
                {
                    name: "next-episode",
                    index: 15,
                    position: "left",
                    html: `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-13"></use><path class="ytp-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z" id="ytp-id-13"></path></svg>`,
                    tooltip: "Tập Tiếp Theo",
                    style: { color: "white" },
                    click: () => {
                        console.log("Next episode");
                    },
                },
            ],
        });

        art.on("ready", () => {
            console.log("Artplayer is ready");
            art.layers.add({
                name: "poster",
                html: `<button style="border-radius: 0.25rem; background: rgba(26, 23, 23, 0.7); border: none; font-size: 1.5rem; padding: 0.75rem 1.25rem; width: 16rem;">Bỏ qua giới thiệu</button>`,
                tooltip: "Bỏ qua giới thiệu",
                click: () => {
                    art.currentTime = 90;
                    art.layers.remove("poster");
                },
            });

            setTimeout(() => {
                art.layers.remove("poster");
            }, 60000);
        });

        return () => {
            art.destroy(true);
        };
    }, [link_m3u8, poster_url]);

    return <div ref={playerRef} style={{ width: "100%", height: "100%" }} />;
};

export default VideoPlayer;
