/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable func-names */
import { Suspense, lazy /* , Component */ } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Loading() {
    return <div>Loading...</div>;
}

const LazyWrapper = (Component) =>
    function (props) {
        return (
            <Suspense fallback={<Loading />}>
                <Component {...props} />
            </Suspense>
        );
    };

const Timeline = LazyWrapper(lazy(() => import("./pages/Timeline")));
const Home = LazyWrapper(lazy(() => import("./pages/Timeline/Home")));
const Top = LazyWrapper(lazy(() => import("./pages/Timeline/Top")));
const Random = LazyWrapper(lazy(() => import("./pages/Timeline/Random")));

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Timeline />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/top" element={<Top />} />
                    <Route path="/random" element={<Random />} />
                    <Route path="*" element={<div>Not found!</div>} />
                </Route>
            </Routes>
        </Router>
    );
}
