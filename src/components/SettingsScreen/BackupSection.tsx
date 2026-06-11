import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Cloud, Upload, Download, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';

export function BackupSection() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeaderRow, { marginBottom: 16 }]}>
        <View style={styles.cardTitleRow}>
          <View style={styles.cardIconWrapper}>
            <Cloud size={20} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Backup na Nuvem</Text>
            <Text style={styles.cardSubtitle}>Em breve</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.backupButton} disabled>
        <LinearGradient
          colors={['#3B82F6', '#10B981']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.backupButtonGradient, { opacity: 0.5 }]}
        >
          <Upload size={18} color="#fff" />
          <Text style={styles.backupButtonText}>Fazer backup no Google Drive</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.restoreButton, { opacity: 0.5 }]} disabled>
        <Download size={18} color="#475569" />
        <Text style={styles.restoreButtonText}>Restaurar do Google Drive</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <AlertCircle size={16} color="#3B82F6" style={{ marginTop: 1 }} />
        <Text style={styles.infoText}>
          <Text style={styles.infoTextBold}>Em desenvolvimento: </Text>
          O backup na nuvem será disponibilizado em uma atualização futura.
        </Text>
      </View>
    </View>
  );
}