import * as React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet ,View , Text} from 'react-native';
import { Index } from './src/Index';

const App = () => (
    <PaperProvider >
        <View style={styles.provider}>
          <Index />
        </View>
    </PaperProvider>
 );

export default App

const styles = StyleSheet.create({
  provider: {
    flex : 1,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// export const App = () => (
//     <>
//     <Text>Teddst</Text>
//     <Text>Test</Text>
//     </>
//  );