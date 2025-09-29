let members = JSON.parse(localStorage.getItem("members")) || [];

function showModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("modal").classList.add("hidden");
}

function addMember() {
  const member = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    age: document.getElementById("age").value,
    year: document.getElementById("year").value,
    phone1: document.getElementById("phone1").value,
    phone2: document.getElementById("phone2").value || "لا يوجد",
    rank: document.getElementById("rank").value,
    club: document.getElementById("club").value,
    joinDate: new Date().toISOString().split('T')[0]
  };

  members.push(member);
  localStorage.setItem("members", JSON.stringify(members));
  renderMember(member, members.length - 1);
  hideModal();
}

function renderMember(member, index) {
  let clubClass = "";
  if (member.club === "رسم") clubClass = "club-رسم";
  else if (member.club === "تجارب واختراعات") clubClass = "club-تجارب";
  else if (member.club === "اعلام الي") clubClass = "club-اعلام";
  else if (member.club === "برمجة") clubClass = "club-برمجة";

  const row = document.createElement("tr");
  row.className = clubClass;
  row.innerHTML = `
    <td>${member.name} ${member.surname}</td>
    <td>${member.rank}</td>
    <td>${member.club}</td>
    <td>${member.joinDate}</td>
    <td>
      <a href="profile.html?index=${index}" title="عرض الملف الشخصي">
        <i class="fas fa-user-circle action-icon"></i>
      </a>
      <i class="fas fa-trash-alt action-icon" title="حذف العضو" onclick="deleteMember(${index}, this)"></i>
    </td>
  `;

  const tableBody = document.getElementById("members-body");
  const noMembersRow = document.getElementById("no-members-row");
  if (noMembersRow) noMembersRow.remove();

  tableBody.appendChild(row);
}

function deleteMember(index, icon) {
  members.splice(index, 1);
  localStorage.setItem("members", JSON.stringify(members));
  icon.closest("tr").remove();

  const tableBody = document.getElementById("members-body");
  if (tableBody.children.length === 0) {
    const noRow = document.createElement("tr");
    noRow.id = "no-members-row";
    noRow.innerHTML = <td colspan="5" class="no-members">لا يوجد أعضاء بعد</td>;
    tableBody.appendChild(noRow);
  } else {
    tableBody.innerHTML = "";
    members.forEach((member, i) => renderMember(member, i));
  }
}

// إعادة عرض الأعضاء عند تحميل الصفحة
window.onload = () => {
  members.forEach((member, i) => renderMember(member, i));
};
