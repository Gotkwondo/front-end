'use client'
import {FC, Suspense, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/Layout/BottomNav/BottomNav";
import {FaBell, FaEye, FaHeart, FaRegCommentDots,FaRegBell} from "react-icons/fa";
import ZoomableImageModal from "../../../components/modals/ZoomableImageModal";
import {boardData} from "@/data/boardData";
import AlarmModal from "@/components/modals/AlarmModal"; // 알림 아이콘 추가
import Header from "@/components/Layout/header/Header";
import Logo from "@/components/Layout/header/Logo";
import DefaultBody from "@/components/Layout/Body/defaultBody";
const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "방금 전";
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}분 전`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    } else {
        return `${Math.floor(diffInSeconds / 86400)}일 전`;
    }
};


const menuItems = [
    { label: "구해요", href: "/main/boards/need-help", icon: "/icons/need-help.png" },
    { label: "소통해요", href: "/main/boards/communicate", icon: "/icons/communicate.png" },
    { label: "비교과", href: "/main/boards/extracurricular", icon: "/icons/extracurricular.png" },
    { label: "정보대 소개", href: "/main/info/department-info", icon: "/icons/info.png" },
    { label: "중고책", href: "/main/boards/used-books", icon: "/icons/used-books.png" },
    { label: "강의실 현황", href: "/roomstatus", icon: "/icons/anonymous-chat.png" },
    { label: "익명 투표", href: "/vote", icon: "/icons/anonymous-vote.png" },
    { label: "수강 후기", href: "/main/info/course-reviews", icon: "/icons/course-reviews.png" },
];

const Calendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    return (
        <div className="relative w-full mt-[18px]">
            <ZoomableImageModal
                images={`/images/calendar/calendar_2024_12.jpg`}
            />
        </div>
    );
};

const mapPostCategoryToBoardPath = (postCategory: string): string | null => {
    for (const boardKey in boardData) {
        const board = boardData[boardKey];
        const tab = board.tabs.find((tab) => tab.postCategory === postCategory);
        if (tab) return boardKey; // 해당 게시판 경로 반환
    }
    return null; // 매칭되는 게시판이 없을 경우
};


const MainPage: FC = () => {
    const [rankingPosts, setRankingPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [hasNewAlarm, setHasNewAlarm] = useState(false); // 알람 여부

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const mapPostCategoryToLabel = (postCategory: string) => {
        for (const boardKey in boardData) {
            const board = boardData[boardKey];
            const tab = board.tabs.find((tab) => tab.postCategory === postCategory);
            if (tab) return board.name;
        }
        return "알 수 없음";
    };

    useEffect(() => {
        const fetchRankingPosts = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    console.error("토큰이 없습니다. 로그인이 필요합니다. 로그인페이지로");
                }
                const response = await fetch("https://www.codin.co.kr/api/posts/top3", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setRankingPosts(data.dataList || []); // 데이터 구조에 따라 수정
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingPosts();
    }, []);


    return (
        <Suspense>
            {/* 헤더 */}
            <Header>
                <Header.Logo/>
                <Header.Notice/>
            </Header>

            <DefaultBody hasHeader={1} >
                {/* 캘린더 */}
                <Calendar />

                {/* 메뉴 섹션 */}
                <section className="mt-[63px] relative flex flex-col">
                    {/* 왼쪽 위에 <div> 텍스트 추가 (메뉴 외부, 왼쪽 정렬) */}

                    {/* 메뉴 아이템 */}
                    <div className="grid grid-cols-4 justify-between gap-y-[24px]">
                        {menuItems.map((menu, index) => (
                            <Link
                                href={menu.href}
                                key={index}
                                className="flex flex-col justify-start items-center text-center text-Mm"
                            >
                                <div className="w-[56px] h-[56px] bg-[#EBF0F7] flex items-center justify-center rounded-full">
                                    <Image src={menu.icon} alt={menu.label} width={28} height={28} />
                                </div>
                                {/* 텍스트 줄바꿈 */}
                                <span className="text-sm font-medium mt-2 break-words leading-tight">
                                    {menu.label.split(" ").map((word, i) => (
                                        <span key={i} className="block">
                                            {word}
                                        </span>
                                    ))}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>


                {/* 게시물 랭킹 */}
                <section className="mt-[48px]">
                    
                    <h2 className="text-XLm">{"게시물 랭킹"}</h2>
                    <div className="pt-[26px] mb-[18px]">
                        {loading ? (
                            <p className="text-center text-sub">랭킹 데이터를 불러오는 중입니다...</p>
                        ) : error ? (
                            <p className="text-center text-sub">{error}</p>
                        ) : rankingPosts.length > 0 ? (
                            rankingPosts.map((post, index) => {
                                const boardPath = mapPostCategoryToBoardPath(post.postCategory);
                                return boardPath ? (
                                    <Link
                                        key={index}
                                        href={`/main/boards/${boardPath}?postId=${post._id}`}
                                        className="block"
                                    >
                                        <div className="flex flex-col gap-[27px] bg-white">
                                            <div className="flex-1 w-full flex flex-col gap-[8px]">
                                                <div>
                                                    <p className="text-sr text-sub px-[4px] py-[2px] bg-[#F2F2F2] rounded-[3px] inline">
                                                        {boardData[boardPath]?.name || "알 수 없음"}
                                                    </p>
                                                </div>
                                                <h3 className="text-Lm">
                                                    {post.title}
                                                </h3>
                                                <p className="text-Mr text-sub">
                                                    {post.content}
                                                </p>
                                                <div className="flex justify-between items-center text-sr text-sub">
                                                    <div className="flex space-x-[6px]">
                                                        <span className="flex items-center gap-[4.33px]">
                                                            <img src="/icons/board/viewIcon.svg" width={16} height={16}/>
                                                            {post.hits || 0}
                                                        </span>
                                                        <span className="flex items-center gap-[4.33px]">
                                                            <img src="/icons/board/heartIcon.svg" width={16} height={16}/>
                                                            {post.likeCount || 0}
                                                        </span>
                                                        <span className="flex items-center gap-[4.33px]">
                                                            <img src="/icons/board/commentIcon.svg" width={16} height={16}/>
                                                            {post.commentCount || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-centertext-sub space-x-1 text-sr">
                                                        <span>{post.anonymous ? "익명" : post.nickname}</span>
                                                        <span> · </span>
                                                        <span>{timeAgo(post.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ) : null;
                            })
                        ) : (
                            <p className="text-center text-gray-500">게시물이 없습니다.</p>
                        )}
                    </div>
                </section>

                {isModalOpen && <AlarmModal onClose={handleCloseModal} />}

            </DefaultBody>
            {/* 하단 네비게이션 */}
            <BottomNav activeIndex={0}/>

        </Suspense>
    );
};

export default MainPage;
