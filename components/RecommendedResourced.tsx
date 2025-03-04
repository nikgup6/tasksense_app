import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { Resource } from '@/app/(tabs)/explore/resource/ResourceContext';
import { Ionicons } from '@expo/vector-icons';

const CARD_WIDTH = Dimensions.get('window').width * 0.7; // 70% of screen width

interface RecommendedResourcesProps {
  resources: Resource[];
  onRequestResource: (resourceId: string) => void;
}

export const RecommendedResources = ({ 
  resources, 
  onRequestResource 
}: RecommendedResourcesProps) => {
  const colorScheme = useColorScheme()


  const renderItem = ({ item }: { item: Resource }) => (
    <View style={[styles.card, colorScheme === 'dark' ? {backgroundColor : 'black'} : {backgroundColor : 'white'}
    ]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.resourceName, colorScheme ==='dark' ? {color : 'white'} : {color : 'black'}
]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.resourceType}>{item.type}</Text>
      </View>
      <Text style={[styles.resourceDetail, colorScheme ==='dark' ? {color : 'white'} : {color : 'black'}
]} numberOfLines={1}>
        School: {item.school}
      </Text>
      <Text style={[styles.resourceDetail, colorScheme ==='dark' ? {color : 'white'} : {color : 'black'}
]} numberOfLines={2}>
        Description: {item.description}
      </Text>
      <Text style={[styles.resourceAvailability, colorScheme ==='dark' ? {color : 'white'} : {color : 'black'}
]}>
        Availability:{' '}
        <Text
          style={{
            color: item.availability ? '#28a745' : '#dc3545',
            fontWeight: 'bold',
          }}
        >
          {item.availability ? 'Available' : 'Not Available'}
        </Text>
      </Text>
      <TouchableOpacity
        style={[
          styles.requestButton,
          { backgroundColor: item.availability ? '#ea495c' : '#CCCCCC' },
        ]}
        onPress={() => onRequestResource(item.id)}
        disabled={!item.availability}
      >
        <Text style={styles.requestButtonText}>
          {item.availability ? 'Request Resource' : 'Not Available'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, colorScheme === 'dark' ? {backgroundColor : 'black'} : {backgroundColor : 'white'}
    ]}>
      <Text style={[styles.sectionTitle, colorScheme ==='dark' ? {color : 'white'} : {color : 'black'}
]}>Recommended  <Ionicons name="sparkles" size={20} color="#ea495c" /></Text>
      <FlatList
        horizontal
        data={resources}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
        snapToInterval={CARD_WIDTH + 15} // Card width + margin
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 8,
    display : "flex",
    alignItems : 'center'
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    borderWidth : 1,
    borderColor : 'grey'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  resourceType: {
    fontSize: 12,
    color: "#ea495c",
    fontStyle: 'italic',
  },
  resourceDetail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  resourceAvailability: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    color: '#333',
  },
  requestButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

