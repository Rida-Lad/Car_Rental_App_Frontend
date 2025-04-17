import Spline from '@splinetool/react-spline';

export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <Spline scene="https://prod.spline.design/YMcrOM3ovUWMyHmI/scene.splinecode" />
      </div>
    </div>
  );
}
