import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { Contact } from './screens/Contact';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
