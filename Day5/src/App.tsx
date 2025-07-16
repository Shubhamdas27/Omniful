import { Modal } from './components/Modal/Modal';
import { SlideModal } from './components/SlideModal/SlideModal';
import { InfiniteScroll } from './components/InfiniteScroll/InfiniteScroll';
import { Accordion } from './components/Accordion/Accordion';
import { AutoComplete } from './components/AutoComplete/AutoComplete';
import { useModal } from './hooks/useModal';
import { useSlideModal } from './hooks/useSlideModal';
import { useInfiniteScroll, type Item } from './hooks/useInfiniteScroll';
import './App.css';

// Sample data for components
const sampleItems: Item[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

const accordionItems = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces, particularly web applications.'
  },
  {
    id: '2',
    title: 'What are React Hooks?',
    content: 'React Hooks are functions that let you use state and other React features in functional components.'
  },
  {
    id: '3',
    title: 'What is TypeScript?',
    content: 'TypeScript is a superset of JavaScript that adds static type definitions to the language.'
  }
];

const suggestions = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape',
  'Honeydew', 'Ice Apple', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango',
  'Nectarine', 'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine'
];

function App() {
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isSlideOpen, openModal: openSlideModal, closeModal: closeSlideModal } = useSlideModal();
  const { items, loading, hasMore, loadMore } = useInfiniteScroll(sampleItems, 20);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Components Dashboard</h1>
        <p>Showcasing Modal (Center & Slide), InfiniteScroll, Accordion, and AutoComplete components</p>
      </header>

      <main className="app-main">
        <section className="component-section">
          <h2>Modal Components</h2>
          <div className="modal-buttons">
            <button onClick={openModal} className="btn btn-primary">
              Open Center Modal
            </button>
            <button onClick={openSlideModal} className="btn btn-secondary">
              Open Side Modal
            </button>
          </div>
          
          <Modal isOpen={isOpen} onClose={closeModal} title="Center Modal">
            <p>This is a traditional center modal with portal rendering and focus management.</p>
            <p>It appears in the center of the screen with an overlay background.</p>
            <div className="modal-actions">
              <button onClick={closeModal} className="btn btn-secondary">
                Close
              </button>
              <button onClick={closeModal} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </Modal>

          <SlideModal isOpen={isSlideOpen} onClose={closeSlideModal} title="Side Panel">
            <p>This is a slide modal that comes from the left side of the screen.</p>
            <p>It's perfect for navigation menus, settings panels, or detailed views.</p>
            
            <h4>Features:</h4>
            <ul>
              <li>Slides in from the left</li>
              <li>Full height panel</li>
              <li>Focus management</li>
              <li>Keyboard navigation</li>
              <li>Responsive design</li>
            </ul>

            <div className="modal-actions">
              <button onClick={closeSlideModal} className="btn btn-secondary">
                Close Panel
              </button>
              <button onClick={closeSlideModal} className="btn btn-primary">
                Apply Settings
              </button>
            </div>
          </SlideModal>
        </section>

        <section className="component-section">
          <h2>AutoComplete Component</h2>
          <AutoComplete
            suggestions={suggestions}
            placeholder="Search for fruits..."
            onSelect={(value) => console.log('Selected:', value)}
          />
        </section>

        <section className="component-section">
          <h2>Accordion Component</h2>
          <Accordion items={accordionItems} allowMultiple={false} />
        </section>

        <section className="component-section">
          <h2>Infinite Scroll Component</h2>
          <div className="infinite-scroll-container">
            <InfiniteScroll
              items={items}
              loading={loading}
              hasMore={hasMore}
              loadMore={loadMore}
              renderItem={(item: Item) => (
                <div key={item.id} className="scroll-item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              )}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App
