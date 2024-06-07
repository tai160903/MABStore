import Header from "../Header/Header";

function Default({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Default;
