import createClient from "@/services/supabase-server-service";
import { redirect } from "next/navigation";

const TermsPage = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }

  return (
    <main className="mb-5 flex w-full flex-col pb-10">
      <strong className="mb-10 mt-3 flex justify-center text-2xl font-bold">
        서비스 이용약관
      </strong>
      <div className="space-y-6 text-sm text-gray-800">
        <section>
          <strong className="font-semibold">제1조 목적</strong>
          <p>
            본 약관은 스무키 (이하 서비스)를 제공하는 팀.포키 (이하 회사)와
            이용자 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을
            목적으로 합니다.
          </p>
        </section>

        <section>
          <strong className="font-semibold">제2조 정의</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>
              서비스란 사용자가 감정 기반 일기를 작성하고, 이를 시각화하여
              달력에 표시하며, 친구와 공유할 수 있는 감정 기록 서비스입니다.
            </li>
            <li>
              이용자란 본 서비스에 접속하여 본 약관에 따라 서비스를 이용하는
              자를 말합니다.
            </li>
            <li>
              제휴 서비스란 Spotify API 등 외부 플랫폼의 기능을 연동하여
              제공되는 서비스를 말합니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제3조 약관의 효력 및 변경</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>
              본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
              공지함으로써 효력을 발생합니다.
            </li>
            <li>
              회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 약관을
              변경할 수 있으며, 변경된 약관은 서비스 내 공지 또는 이메일 등을
              통해 공지합니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제4조 서비스의 제공 및 변경</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>회사는 이용자에게 다음과 같은 서비스를 제공합니다:</li>
            <ul className="ml-4 list-inside list-disc">
              <li>감정 일기 작성 및 저장 기능</li>
              <li>AI 기반 감정 분석</li>
              <li>감정 시각화 및 달력 표시</li>
              <li>Spotify API를 통한 감정 기반 음악 추천 또는 연동</li>
              <li>친구 추가 및 감정 공유 기능</li>
            </ul>
            <li>
              회사는 필요 시 서비스의 내용을 변경할 수 있으며, 변경 시 사전에
              공지합니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제5조 이용자의 의무</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>
              이용자는 다음 행위를 하여서는 안 됩니다:
              <ul className="ml-4 list-inside list-disc">
                <li>타인의 개인정보 도용</li>
                <li>서비스 내 허위 정보 기재</li>
                <li>제3자의 지식재산권을 침해하는 행위</li>
                <li>비정상적인 방법으로 시스템에 접근하는 행위</li>
              </ul>
            </li>
            <li>
              이용자는 관계 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여
              공지한 사항 등을 준수해야 합니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제6조 개인정보 보호</strong>
          <p>
            회사는 이용자의 개인정보를 보호하기 위하여 「개인정보 보호법」 등
            관련 법령에 따라 개인정보처리방침을 수립하고, 이를 서비스 내에
            게시합니다.
          </p>
        </section>

        <section>
          <strong className="font-semibold">제7조 제3자 서비스의 이용</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>서비스는 Spotify 등 외부 API와 연동되어 제공됩니다.</li>
            <li>
              이용자는 Spotify 이용약관 및 개인정보정책을 반드시 확인해야 하며,
              Spotify와의 관계는 해당 플랫폼의 정책에 따릅니다.
            </li>
            <li>
              Spotify API를 통한 기능 사용 시, 해당 기능의 일부 제한이 있을 수
              있습니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제8조 서비스의 중단</strong>
          <p>
            회사는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수
            있습니다:
          </p>
          <ul className="ml-4 list-inside list-disc">
            <li>시스템 점검, 교체, 고장 등</li>
            <li>천재지변 또는 불가항력적 사유 발생 시</li>
          </ul>
        </section>

        <section>
          <strong className="font-semibold">제9조 책임의 제한</strong>
          <ol className="list-inside list-decimal space-y-1">
            <li>
              회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을
              지지 않습니다.
            </li>
            <li>
              회사는 이용자 간 또는 이용자와 제3자 간에 발생한 분쟁에 개입하지
              않으며, 그로 인한 손해를 책임지지 않습니다.
            </li>
          </ol>
        </section>

        <section>
          <strong className="font-semibold">제10조 지적재산권</strong>
          <p>
            서비스 및 이에 관련된 모든 자료의 지적재산권은 회사에 귀속되며,
            이용자는 이를 무단으로 복제, 배포, 수정, 전송할 수 없습니다.
          </p>
        </section>

        <section>
          <strong className="font-semibold">제11조 관할법원 및 준거법</strong>
          <p>
            본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은
            서울중앙지방법원을 제1심 전속관할 법원으로 합니다.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsPage;
