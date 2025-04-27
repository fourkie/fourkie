import createClient from "@/services/supabase-server-service";
import { redirect } from "next/navigation";

type NoticeItem = {
  title: string;
  date: string;
  content: string;
};

const notices: NoticeItem[] = [
  {
    title: "🎉 서비스 출시 안내",
    date: "2025.04.20",
    content: "스무키 서비스를 오픈했습니다! 지금 바로 감정일기를 시작해보세요.",
  },
  {
    title: "📱 앱 출시 소식",
    date: "2025.04.22",
    content:
      "스무키 앱이 정식 출시되었습니다. Play Store에서 '스무키'를 검색해보세요!",
  },
  {
    title: "💻 깃허브 오픈",
    date: "2025.04.10",
    content:
      "프로젝트의 소스 코드를 GitHub에 공개했습니다. https://github.com/fourkie",
  },
];

const events: NoticeItem[] = [
  {
    title: "🥳 글 100개 작성 이벤트",
    date: "상시 진행",
    content: "감정일기를 100개 이상 작성한 분께 스페셜 감정 쿠키를 드려요!",
  },
  {
    title: "🎭 만우절 감정 반전 이벤트",
    date: "2025.04.01",
    content: "오늘만 감정 분석 결과가 반대로 나옵니다. 😉",
  },
  {
    title: "🎈 어린이날 기념 스티커 증정",
    date: "2025.05.05",
    content: "귀여운 감정 스티커를 오늘 하루 로그인한 유저에게 드립니다!",
  },
  {
    title: "💐 어버이날 맞이 메시지 카드",
    date: "2025.05.08",
    content: "감정일기를 작성하면 가족에게 감정 메시지 카드가 전달됩니다.",
  },
];

const NoticePage = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }

  const renderList = (title: string, items: NoticeItem[]) => (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-2xl p-4 shadow hover:bg-primary-50">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
              <p className="text-sm text-gray-700">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <main className="mx-auto my-10 max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">공지사항 및 이벤트</h1>
      {renderList("📢 공지사항", notices)}
      {renderList("🎉 이벤트", events)}
    </main>
  );
};

export default NoticePage;
