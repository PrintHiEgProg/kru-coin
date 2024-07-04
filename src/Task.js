import React from "react";


 //Tasks
 const TgPremium = () => {
  const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
  if (levelTgPremium === 1) {
    alert("You have already completed this task ✅");
  } else {
    if (
      window.confirm(
        "If you have Telegram premium you get +1000 coins.\nTo execute?"
      )
    ) {
      if (tg.initDataUnsafe.user.isPremium) {
        setCount(count + 1000);
        setlevelTgPremium(levelTgPremium + 1);
        alert("Yoooo!\nCongratulations on buying TG Premium! ⭐️");
      } else {
        alert("Sorry, but you don't have tg premium 😔");
      }
    }
  }
};

const TgChannel1 = () => {
  const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  if (levelTgChannel1 === 1) {
    alert("You have already completed this task ✅");
  } else {
    const checkSubsciption = async () => {
      try {
        //endpoint api

        const response = await axios.get("https://api.server.com/check-sub");
        if (response.data.subscribed) {
          setIsSubscribed(true);

          const currentCount =
            parseInt(localStorage.getItem("count"), 10) || 0;

          localStorage.setItem("count", currentCount + 20000);
          alert(
            "спасибо за выполнения задания, нам важно ваше присутствие с нами"
          );
          setLevelTgChannel1(levelMoreEnergy + 1);
        } else {
          if (
            window.confirm(
              "Subscribe to the telegram channel and get +20,000 coins. To execute?"
            )
          ) {
            //выполнение задания

            const handleSubscribe = () => {
              tg.openTelegramLink("https://t.me/deanon_team_blog", "_blank"); //ссылка на тгк
            };
          }
        }
      } catch (error) {
        console.error("watafak", error);
      }
    };
  }
};
function Task({ TgPremium, TgChannel1 }) {
  return (
    <div className="Task">
      <h2 className="title">Task</h2>
      <div className="catalog">
        <div className="task-card" onClick={TgPremium}>
          <div className="task-img"></div>
          <div className="task-text">
            <b>Get Tg Premium</b>
          </div>
          <hr className="task-hr" />
          <div className="task-footer">
            <div className="task-level"></div>
            <div className="task-price">+1000</div>
            <div className="task-money"></div>
          </div>
        </div>
        <div className="task-card" onClick={TgChannel1}>
          <div className="task-img"></div>
          <div className="task-text">
            <b>Add Tg Channel</b>
          </div>
          <hr className="task-hr" />
          <div className="task-footer">
            <div className="task-level"></div>
            <div className="task-price">+20K</div>
            <div className="task-money"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Task;
