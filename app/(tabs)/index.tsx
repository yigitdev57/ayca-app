import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Share, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [userData, setUserData] = useState([{ 
    id: 1, 
    username: 'Ayça Özefe', 
    dinlenme: 205625,
    followerCount: 12543,
    bio: '@aycaozefe',
    verified: true
  }]);

  const [playList, setPlaylist] = useState([
    { 
      id: 1, 
      title: "gülüşünde bi' şey var", 
      artist: 'Ayça Özefe', 
      album: 'gülüşünde bi\' şey var', 
      dinlenme: 205625, 
      likeCount: 1234,
      duration: '3:42',
      releaseDate: '2024',
      isPlaying: false
    },
    { 
      id: 2, 
      title: "yine de sen", 
      artist: 'Ayça Özefe', 
      album: 'yine de sen', 
      dinlenme: 150021, 
      likeCount: 892,
      duration: '4:15',
      releaseDate: '2023',
      isPlaying: false
    },
    { 
      id: 3, 
      title: "sessizlik", 
      artist: 'Ayça Özefe', 
      album: 'gecenin sesi', 
      dinlenme: 89743, 
      likeCount: 567,
      duration: '3:28',
      releaseDate: '2023',
      isPlaying: false
    }
  ]);

  const [following, setFollowing] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);

  const handleFollowToggle = () => {
    if (following) {
      Alert.alert(
        'Takibi Bırak',
        `${userData[0].username} sanatçısını takip etmeyi bırakmak istediğinizden emin misiniz?`,
        [
          { text: 'İptal', style: 'cancel' },
          { 
            text: 'Takibi Bırak', 
            style: 'destructive',
            onPress: () => {
              setFollowing(false);
              Alert.alert('✅', `Artık ${userData[0].username} takip etmiyorsunuz.`);
            }
          }
        ]
      );
    } else {
      setFollowing(true);
      Alert.alert('🎉', `${userData[0].username} sanatçısını takip etmeye başladınız!`);
    }
  };

  const handleSongPlay = (songId) => {
    setPlaylist(prevPlaylist => 
      prevPlaylist.map(song => ({
        ...song,
        isPlaying: song.id === songId ? !song.isPlaying : false
      }))
    );
  };

  const handleLike = (songId) => {
    setPlaylist(prevPlaylist => 
      prevPlaylist.map(song => 
        song.id === songId 
          ? { ...song, likeCount: song.likeCount + 1 }
          : song
      )
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${userData[0].username} sanatçısını dinlemelisin! Harika müzikleri var. 🎵`,
        title: `${userData[0].username} - Müzik Profili`
      });
    } catch (error) {
      console.log('Paylaşım hatası:', error);
    }
  };

  const displayedSongs = showAllSongs ? playList : playList.slice(0, 2);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f8f9fa', dark: '#1a1a2e' }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <Image
            source={require('@/assets/images/aycam.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      }>
      
      <ThemedView style={styles.profileContainer}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.username}>
            {userData[0].username}
          </ThemedText>
          {userData[0].verified && (
            <Ionicons name="checkmark-circle" size={24} color="#1DA1F2" style={styles.verifiedIcon} />
          )}
        </View>
        
        <ThemedText style={styles.bio}>{userData[0].bio}</ThemedText>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type='subtitle' style={styles.statNumber}>
              {userData[0].dinlenme.toLocaleString()}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Aylık Dinleyici</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <ThemedText type='subtitle' style={styles.statNumber}>
              {userData[0].followerCount.toLocaleString()}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Takipçi</ThemedText>
          </View>
        </View>
      </ThemedView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.followButton, following && styles.followingButton]} 
          onPress={handleFollowToggle}
        >
          <Ionicons 
            name={following ? "person-remove-outline" : "person-add-outline"} 
            size={20} 
            color={following ? "#ff6b6b" : "#ffffff"} 
            style={styles.buttonIcon}
          />
          <ThemedText style={[styles.followButtonText, following && styles.followingButtonText]}>
            {following ? 'Takibi Bırak' : 'Takip Et'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.songsContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type='subtitle' style={styles.sectionTitle}>Popüler Şarkılar</ThemedText>
          <TouchableOpacity onPress={() => setShowAllSongs(!showAllSongs)}>
            <ThemedText style={styles.showAllButton}>
              {showAllSongs ? 'Daha Az Göster' : 'Tümünü Göster'}
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.songsListContainer}>
          {displayedSongs.map((song, index) => (
            <View key={song.id} style={styles.songItem}>
              <View style={styles.songInfo}>
                <View style={styles.songNumber}>
                  <ThemedText style={styles.rankNumber}>{index + 1}</ThemedText>
                </View>
                
                <View style={styles.songDetails}>
                  <ThemedText type='link' style={styles.songTitle}>
                    {song.title}
                  </ThemedText>
                  <ThemedText style={styles.songArtist}>
                    {song.artist} • {song.album}
                  </ThemedText>
                  <View style={styles.songStats}>
                    <ThemedText style={styles.songStat}>
                      {song.dinlenme.toLocaleString()} dinlenme
                    </ThemedText>
                    <ThemedText style={styles.songStat}>
                      {song.duration}
                    </ThemedText>
                    <ThemedText style={styles.songStat}>
                      {song.releaseDate}
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <View style={styles.songActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleLike(song.id)}
                >
                  <Ionicons name="heart-outline" size={20} color="#666" />
                  <ThemedText style={styles.actionText}>{song.likeCount}</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => handleSongPlay(song.id)}
                >
                  <Ionicons 
                    name={song.isPlaying ? "pause" : "play"} 
                    size={20} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  headerOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  shareButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  profileContainer: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(44, 154, 228, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c9ae4',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: '#2c9ae4',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  followingButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  buttonIcon: {
    marginRight: 8,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#ff6b6b',
  },
  songsContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  showAllButton: {
    color: '#2c9ae4',
    fontSize: 14,
    fontWeight: '500',
  },
  songsListContainer: {
    gap: 15,
  },
  songItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  songInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  songNumber: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c9ae4',
  },
  songDetails: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  songStats: {
    flexDirection: 'row',
    gap: 15,
  },
  songStat: {
    fontSize: 12,
    color: '#888',
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  playButton: {
    backgroundColor: '#2c9ae4',
    borderRadius: 20,
    padding: 8,
  },
});

// Coded By Yiğit Yüksel.