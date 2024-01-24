import Button from "@/components/Button";
import './Landing.scss';
import Header from "@/components/Header";

export default function LandingPage() {
    return (
        <div>
            <Header/>
            <div id="start">
                <p className="description">Get Started!</p>
                <Button styleType="login">
                    로그인
                </Button>
                <Button styleType="signup">
                    회원가입
                </Button>
            </div>
        </div>
    );
}