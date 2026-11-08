import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

const CAREER_FIELDS = [
  {
    id: '1',
    title: '💻 Computer Science & IT (Software/Web/App)',
    shortDesc: 'High demand in Web Dev, MERN Stack, React Native, and AI.',
    scope: 'Pakistan aur international remote market mein sab se ziada demand CS & IT ki hai. Software Engineering, Full-Stack development, aur App development mein fresh graduates ke liye high salary packages aur freelance opportunities mojood hain.',
    skills: 'JavaScript, React.js, React Native, Node.js, TypeScript, MongoDB',
    avgSalary: 'PKR 100,000 - 350,000+ per month',
  },
  {
    id: '2',
    title: '🤖 Artificial Intelligence & Data Science',
    shortDesc: 'Machine Learning, Deep Learning, Data Analytics, and GenAI.',
    scope: 'Modern tech industry ka sab se tezi se barhta hua field. Data processing, predictive modeling, aur LLM integration ki waja se AI engineers ki corporate sector mein bohat high demand hai.',
    skills: 'Python, TensorFlow, PyTorch, Pandas, SQL, Machine Learning',
    avgSalary: 'PKR 120,000 - 400,000+ per month',
  },
  {
    id: '3',
    title: '🎨 UI/UX Design & Creative Prototyping',
    shortDesc: 'App/Web Designing, User Research, Wireframing, and Branding.',
    scope: 'Digital products aur mobile apps ke user experience ko behtar banane ke liye UI/UX designers ki har software house ko zaroorat hoti hai. Remote jobs aur Upwork/Fiverr par iska bohat scope hai.',
    skills: 'Figma, Adobe XD, Photoshop, Illustrator, Wireframing',
    avgSalary: 'PKR 80,000 - 250,000 per month',
  },
  {
    id: '4',
    title: '📈 Commerce, Accounting & Business Admin',
    shortDesc: 'CA, ACCA, Financial Analysis, Corporate Banking, and Management.',
    scope: 'Business administration aur corporate finance har commercial idaray ki bunyad hain. Banks, multinational companies, aur auditing firms mein career ke vast growth paths hain.',
    skills: 'Financial Modeling, Advanced Excel, Auditing, Corporate Law',
    avgSalary: 'PKR 70,000 - 220,000 per month',
  },
  {
    id: '5',
    title: '🩺 Pre-Medical & Allied Health Sciences',
    shortDesc: 'MBBS, BDS, DPT (Physiotherapy), Pharmacy, and Lab Tech.',
    scope: 'Healthcare sector hamesha se top priority raha hai. Clinical practice ke ilawa physical therapy, medical lab technology, aur biotechnology mein bhi employment ke behtareen mawaqay hain.',
    skills: 'Patient Care, Clinical Research, Anatomy, Pharmacology',
    avgSalary: 'PKR 80,000 - 300,000+ per month',
  },
  {
    id: '6',
    title: '⚙️ Pre-Engineering & Robotics',
    shortDesc: 'Electrical, Mechanical, Civil Engineering, and Industrial Automation.',
    scope: 'Traditional engineering ke sath-sath ab automation aur smart systems ka rujhan barh raha hai. Construction firms, manufacturing plants, aur power sector mein engineers ki demand rehti hai.',
    skills: 'AutoCAD, Circuit Design, Project Management, Thermodynamics',
    avgSalary: 'PKR 75,000 - 200,000 per month',
  },
  {
    id: '7',
    title: '✍️ Mass Communication & Digital Media',
    shortDesc: 'Journalism, Video Editing, Content Writing, and Social Media Marketing.',
    scope: 'Digital media, news agencies, aur e-commerce brands ko apne products aur news ko promote karne ke liye content creators aur digital marketers ki bohat zaroorat hoti hai.',
    skills: 'Content Strategy, Premiere Pro, SEO, Copywriting, Social Media',
    avgSalary: 'PKR 60,000 - 180,000 per month',
  },
];

export const CareerExplorerScreen = ({ navigation }: any) => {
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (career: any) => {
    setSelectedCareer(career);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎯 Career Explorer</Text>
      <Text style={styles.subHeader}>
        Explore all available career fields below. Tap any field to check its detailed scope, required skills, and salary package.
      </Text>

      {/* Mapping all career fields */}
      {CAREER_FIELDS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => handleCardPress(item)}
          activeOpacity={0.85}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.shortDesc}</Text>
          <Text style={styles.tapPrompt}>Tap to view details ›</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCareer && (
              <>
                <Text style={styles.modalTitle}>{selectedCareer.title}</Text>
                
                <Text style={styles.modalSectionLabel}>📊 Detailed Scope & Market Demand:</Text>
                <Text style={styles.modalText}>{selectedCareer.scope}</Text>

                <Text style={styles.modalSectionLabel}>🛠️ Core Skills Required:</Text>
                <Text style={styles.modalText}>{selectedCareer.skills}</Text>

                <Text style={styles.modalSectionLabel}>💰 Average Earning Potential:</Text>
                <Text style={[styles.modalText, styles.salaryText]}>{selectedCareer.avgSalary}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close Details</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subHeader: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 18,
  },
  tapPrompt: {
    fontSize: 12,
    color: '#007BFF',
    fontWeight: '600',
    textAlign: 'right',
  },
  backBtn: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  backText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  modalSectionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 12,
    marginBottom: 4,
  },
  modalText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  salaryText: {
    color: '#059669',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CareerExplorerScreen;