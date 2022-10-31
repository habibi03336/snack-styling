const Notification = ({ text }: { text: string }) => {
  return (
    <div style={{ color: "tomato" }}>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
