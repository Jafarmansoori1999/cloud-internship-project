import { db, auth } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const studentForm = document.getElementById('student-form');
const studentTableBody = document.getElementById('student-table-body');
const logoutBtn = document.getElementById('logout-btn');
const userEmailDisplay = document.getElementById('user-email-display');

// 1. Auth State Check & User Email Display
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (userEmailDisplay) {
            userEmailDisplay.textContent = user.email;
        }
    } else {
        window.location.href = 'login.html';
    }
});

// 2. Fetch and Display Students Data from Firestore
async function fetchStudents() {
    if (!studentTableBody) return;
    
    try {
        const querySnapshot = await getDocs(collection(db, "students"));
        studentTableBody.innerHTML = ''; // Clear loading text
        
        if (querySnapshot.empty) {
            studentTableBody.innerHTML = '<tr><td colspan="3">No records found.</td></tr>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = `
                <tr>
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.course || 'N/A'}</td>
                    <td><span style="color: #6c757d; font-style: italic;">No File (Free Tier)</span></td>
                </tr>
            `;
            studentTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching students: ", error);
        studentTableBody.innerHTML = `<tr><td colspan="3" style="color:red;">Error loading data: ${error.message}</td></tr>`;
    }
}

// 3. Add New Student Record
if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('student-name');
        const courseInput = document.getElementById('student-course');

        const name = nameInput ? nameInput.value : '';
        const course = courseInput ? courseInput.value : '';

        try {
            await addDoc(collection(db, "students"), {
                name: name,
                course: course,
                createdAt: new Date()
            });

            alert("Student details saved successfully to Cloud Firestore!");
            studentForm.reset();
            fetchStudents(); // Refresh table data
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error saving data: " + error.message);
        }
    });
}

// 4. Logout Functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = 'login.html';
        }).catch((error) => {
            alert("Logout Error: " + error.message);
        });
    });
}

// Initial Fetch on Page Load
fetchStudents();