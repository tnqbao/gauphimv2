import React, { useEffect, useRef, useCallback } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { VideoPlayerProps } from "@/utils/types";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";

const VideoPlayer: React.FC<VideoPlayerProps> = ({ link_m3u8, poster_url }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);
    const artRef = useRef<Artplayer | null>(null);
    const router = useRouter();
    const slug = router.query.slug as string;
    const ep = router.query.ep as string;
    const episodes = useSelector((state: RootState) => state.player.episodes);

    const playM3u8 = useCallback((video: HTMLVideoElement, url: string, art: Artplayer) => {
        if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;

            hls.on(Hls.Events.ERROR, (_, data) => {
                console.error("HLS error", data);
            });

            art.on("destroy", () => hls.destroy());
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
        } else {
            console.error("HLS is not supported");
        }
    }, []);

    useEffect(() => {
        if (link_m3u8 && playerRef.current) {
            const art = new Artplayer({
                container: playerRef.current,
                url: link_m3u8,
                type: link_m3u8.endsWith(".m3u8") ? "m3u8" : "youtube",
                poster: poster_url,
                customType: {
                    m3u8: playM3u8,
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
                autoMini: false,
                screenshot: true,
                setting: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                subtitleOffset: true,
                miniProgressBar: true,
                controls: [
                    {
                        name: "next-episode",
                        index: 15,
                        position: "left",
                        html: `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path d="M12,24 L20.5,18 L12,12 V24 Z M22,12 V24 H24 V12 H22 Z"></path>
               </svg>`,
                        tooltip: "Next Episode",
                        style: { color: "white" },
                        click: () => {
                            const currentEpisode = parseInt(ep);
                            const totalEpisodes = episodes.length;

                            if (!Number.isInteger(currentEpisode)) {
                                console.log("No have next episode");
                                return;
                            }

                            if (currentEpisode >= totalEpisodes) {
                                console.log("This is the last episode");
                                return;
                            }

                            const nextEpisode = currentEpisode + 1;
                            router.push(`../watch/${slug}?ep=${nextEpisode}`);
                        },
                    },
                ],
            });

            artRef.current = art;
            art.on("ready", () => {
                art.layers.add({
                    name: "skip-intro",
                    html: `<button style="border-radius: 0.25rem; background: rgba(26, 23, 23, 0.7); 
                              border: none; font-size: 1.5rem; padding: 0.75rem 1.25rem; width: 16rem;
                              bottom: 10px; left: 10px;" class="">
                              Skip Intro</button>`,
                    style: {
                        position: "absolute",
                        right: "12rem",
                        bottom: "6rem",
                        backgroundColor: "transparent",
                        width: "9rem",
                        paddingInline: "2rem",
                    },
                    tooltip: "Skip Intro",
                    click: () => {
                        art.currentTime = 90;
                        art.layers.remove("skip-intro");
                    },
                });

                setTimeout(() => {
                    art.layers.remove("skip-intro");
                }, 60000);
            });

            return () => {
                art.destroy(true);
            };
        }
    }, [link_m3u8, poster_url, playM3u8]);

    return (
        <div className="relative w-full pt-[56.25%] flex justify-center p-5 mt-16">
            <div
                ref={playerRef}
                className="absolute inset-0 w-full h-full lg:p-9"
            ></div>
        </div>
    );
};
export default VideoPlayer;
