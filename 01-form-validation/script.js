const form = document.getElementById("contact-form"); //フォームを掴む
form.addEventListener("submit", (e) => {
  //送信されたらこの関数を実行
  e.preventDefault(); //ブラウザの自動リロードを止める
  let isValid = true; //満点スタートのフラグ

  const nameInput = document.getElementById("name"); //入力欄本体
  const nameGroup = nameInput.closest(".form-group"); //その欄を囲む箱
  const nameError = nameGroup.querySelector(".error-text"); //その箱の中のエラー文置き場
  if (nameInput.value.trim() === "") {
    //判定：空っぽ？
    nameGroup.classList.add("is-error"); //枠を赤に（css反応させる）
    nameError.textContent = "お名前を入力してください"; //メッセージを入れる
    isValid = false; //エラー出したら不合格
  } else {
    nameGroup.classList.remove("is-error"); //OKならエラー外す
    nameError.textContent = ""; //メッセージを消す
  }

  const emailInput = document.getElementById("email");
  const emailGroup = emailInput.closest(".form-group");
  const emailError = emailGroup.querySelector(".error-text");
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue === "") {
    emailGroup.classList.add("is-error");
    emailError.textContent = "メールアドレスを入力してください";
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    emailGroup.classList.add("is-error");
    emailError.textContent = "メールアドレスの形式が間違っています";
    isValid = false;
  } else {
    emailGroup.classList.remove("is-error");
    emailError.textContent = "";
  }

  const messageTextarea = document.getElementById("message");
  const messageGroup = messageTextarea.closest(".form-group");
  const messageError = messageGroup.querySelector(".error-text");
  const messageValue = messageTextarea.value.trim();
  if (messageValue === "") {
    messageGroup.classList.add("is-error");
    messageError.textContent = "メッセージを入力してください";
    isValid = false;
  } else if (messageValue.length < 10) {
    messageGroup.classList.add("is-error");
    messageError.textContent = "メッセージは10文字以上で入力してください";
    isValid = false;
  } else {
    messageGroup.classList.remove("is-error");
    messageError.textContent = "";
  }

  if (isValid) {
    //どの欄もエラー出さなかったら
    alert("送信しました！"); //成功アラート
    form.reset(); //入力欄をクリア
  }
});
