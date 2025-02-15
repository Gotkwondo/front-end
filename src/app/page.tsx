"use client";

import Image from "next/image";

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-900 text-gray-100">
            {/* 헤더 섹션 */}
            <header className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 text-white text-center py-8 sm:py-12 rounded-md shadow-xl">
                <h1 className="text-3xl sm:text-5xl font-extrabold">CodIN: 코드 안의 사람들</h1>
                <p className="text-lg sm:text-2xl mt-4">Code INU, Code in, Code 人</p>
            </header>

            {/* 로그인/메인페이지 버튼 섹션 */}
            <section className="mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-6 sm:mb-0 sm:text-left">
                        <h2 className="text-xl sm:text-3xl font-bold text-yellow-400 mb-2">
                            당신의 코딩 여정을 시작하세요
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-300">
                            로그인하거나 메인 페이지로 이동하여 CodIN의 다양한 기능을 탐험하세요.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md transition-all duration-200"
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => (window.location.href = "/main")}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md transition-all duration-200"
                        >
                            메인 페이지
                        </button>
                    </div>
                </div>
            </section>

            {/* 프로젝트 소개 */}
            <section className="mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-1 sm:pb-2">
                    프로젝트 소개
                </h2>
                <p className="text-base sm:text-lg mb-4">
                    <b>CodIN</b>은 Code INU, Code in (코드 안의), Code 人 (코딩하는 사람들)의 의미를 담고 있습니다.
                </p>
                <p className="text-base sm:text-lg">
                    코드와 함께 살아가는 학우들이 <b>안에서뿐만 아니라 밖에서도 어울릴 수 있기를</b> 바랍니다.
                </p>
            </section>

            {/* 주된 목표 */}
            <section className="mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-1 sm:pb-2">
                    주된 목표
                </h2>
                <ul className="list-disc list-inside space-y-3 sm:space-y-4 text-base sm:text-lg">
                    <li>학생들 간의 네트워킹 강화</li>
                    <li>학과 및 대학 정보의 효율적인 전달</li>
                    <li>프로젝트 협업 및 스터디 그룹 형성 촉진</li>
                    <li>취업 정보 및 비교과 활동 기회 공유</li>
                </ul>
            </section>

            {/* 핵심 기능 */}
            <section className="mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-1 sm:pb-2">
                    CodIN만의 핵심 기능
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <li className="bg-gray-800 p-4 sm:p-6 rounded-md shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">📌 클린봇 & 신고 정책</h3>
                        <p className="text-sm sm:text-base">
                            AI 기반 클린봇으로 부적절한 게시글 필터링 및 운영진 검토로 깨끗한 SNS 운영
                        </p>
                    </li>
                    <li className="bg-gray-800 p-4 sm:p-6 rounded-md shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">📚 정보대 월간 소식지</h3>
                        <p className="text-sm sm:text-base">정보대 학생회에서 제공하는 월간 소식지를 통해 학우들의 참여를 독려</p>
                    </li>
                    <li className="bg-gray-800 p-4 sm:p-6 rounded-md shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">🤝 프로젝트 협업</h3>
                        <p className="text-sm sm:text-base">스터디 그룹 형성 및 협업 촉진을 위한 다양한 기능 제공</p>
                    </li>
                </ul>
            </section>

            {/* UI/UX 섹션 */}
            <section className="mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 border-b border-gray-700 pb-1 sm:pb-2">
                    CodIN의 UI/UX
                </h2>
                <p className="text-base sm:text-lg mb-4 sm:mb-6">
                    CodIN은 정보대의 색상 조합(노랑, 빨강, 파랑)을 활용한 친근한 디자인과 HTML 형식의 직관적인 인터페이스를 제공합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-gray-800 h-48 sm:h-64 w-full rounded-md overflow-hidden flex justify-center items-center">
                        <Image
                            src="/images/소통해요_Page.jpg"
                            alt="소통해요 페이지"
                            width={400}
                            height={400}
                            className="object-contain w-full h-full"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
