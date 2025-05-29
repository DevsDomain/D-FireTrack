import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 10,
    width: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    zIndex: 999,
    elevation: 5,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#2c2c3f',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuContent: {
    padding: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  chevron: {
    marginLeft: 'auto',
  },
  section: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12,
    marginTop: -6,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
  },
});