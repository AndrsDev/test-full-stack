import React from 'react';
import Card from 'components/card';
import PrimaryButton from 'components/primary_button';

function App() {
  return (
    <div className="App">
      <Card>
        <h1>Hello world</h1>
      </Card>
      <PrimaryButton label="Buttson" />
    </div>
  );
}

export default App;
