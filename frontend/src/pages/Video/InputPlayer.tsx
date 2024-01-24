import Button from "@/components/Button";

export default function InputPlayer(){

    return(
        <div id="input-player">
            <p className="description"> 이제, 원하는 선수를 입력해주세요. </p>

            <form >
                <input name="name" placeholder=" 선수 이름"></input>
            </form>
                <Button styleType="previous">이전으로</Button>
                <Button styleType="next">다음으로</Button>
        </div>
    );
}